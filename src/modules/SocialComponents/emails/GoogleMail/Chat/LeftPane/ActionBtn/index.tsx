import { useState } from 'react';

import { Popover, Button, MenuItem, Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CommonModal from '@/components/CommonModal';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES, Gmail_CONST, indexNumbers } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { WarningIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteGmailMutation,
  usePatchGmailMessageMutation,
  usePermanentlyDeleteGmailMutation,
  usePostLinkToDealGmailMutation,
} from '@/services/commonFeatures/email/gmail';
import { useDispatch } from 'react-redux';
import {
  setActiveGmailRecord,
  setGmailList,
  setSelectedGmailRecords,
} from '@/redux/slices/email/gmail/slice';
import SendEmailDrawer from '../../../SendEmail';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  FilterData,
  validationSchema,
} from './DealFilterDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { isNullOrEmpty } from '@/utils';

const ActionBtn = () => {
  const [isOpenSendEmailDrawer, setIsOpenSendEmailDrawer] = useState(false);
  const [mailType, setMailType] = useState('');
  const dispatch = useDispatch();

  const gmailTabType: any = useAppSelector(
    (state: any) => state?.gmail?.gmailTabType,
  );
  const selectedGmailRecords: any = useAppSelector(
    (state: any) => state?.gmail?.selectedGmailRecords,
  );

  const tabName = gmailTabType?.name?.toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [isLinkToDealModal, setIsLinkToDealModal] = useState(false);
  const [isRestoreEmail, setIsRestoreEmail] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubMenuClick = (event: any) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
  };
  const [patchGmailMessage, { isLoading: loadingRestore }] =
    usePatchGmailMessageMutation();

  const [PostLinkToDealGmail, { isLoading: loadingLinkToDeal }] =
    usePostLinkToDealGmailMutation();

  const [deleteGmail, { isLoading: loadingDelete }] = useDeleteGmailMutation();
  const [permanentlyDeleteGmail, { isLoading: loadingPermanentlyDelete }] =
    usePermanentlyDeleteGmailMutation();

  const handelRestore = async () => {
    const ids =
      selectedGmailRecords &&
      selectedGmailRecords?.map((message: any) => message?.id);
    const payload: any = {
      fromFolderId: Gmail_CONST?.TRASH,
      toFolderId: Gmail_CONST?.INBOX,
    };
    if (ids.length < 2) {
      payload.messageId = ids[0];
    } else {
      payload.messageId = ids;
    }
    try {
      await patchGmailMessage({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Email restore successfully', {
        variant: 'success',
      });
      setIsRestoreEmail(false);
      handleClose();
      handleCloseSubMenu();
      dispatch(setSelectedGmailRecords([]));
      dispatch(setActiveGmailRecord({}));
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const handelDelete = async () => {
    const payload = {
      threadIds: selectedGmailRecords?.map((message: any) => message?.id),
    };
    try {
      tabName === 'trash'
        ? await permanentlyDeleteGmail({ body: payload })?.unwrap()
        : await deleteGmail({ body: payload })?.unwrap();
      enqueueSnackbar(
        `${
          tabName === 'trash'
            ? 'Email Permanently Deleted'
            : 'Email Move to Trash'
        }`,
        {
          variant: 'success',
        },
      );
      handleClose();
      setIsDeleteModalOpen(false);
      dispatch(setSelectedGmailRecords([]));
      dispatch(setActiveGmailRecord({}));
      dispatch(setGmailList('clear'));
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const handelMailClick = async () => {
    const payload: any = {
      messageId: selectedGmailRecords[0]?.messageId,
      starred: false,
    };

    if (selectedGmailRecords[0]?.readMessage) {
      payload.read = true;
    } else {
      payload.unread = true;
    }
    try {
      await patchGmailMessage({
        body: payload,
      })?.unwrap();
      dispatch(setGmailList('clear'));
      dispatch(setSelectedGmailRecords([]));
    } catch (error: any) {
      enqueueSnackbar('Something went wrong while updating message!', {
        variant: 'error',
      });
    }
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    const payload = {
      provider: 'GMAIL',
      threadId: selectedGmailRecords[indexNumbers?.ZERO]?.threadId,
      dealIds: values?.dealName,
      from: selectedGmailRecords[indexNumbers?.ZERO]?.name,
      to: [selectedGmailRecords[indexNumbers?.ZERO]?.to],
      ...(!isNullOrEmpty(selectedGmailRecords[indexNumbers?.ZERO]?.cc)
        ? { cc: [selectedGmailRecords[indexNumbers?.ZERO]?.cc] }
        : {}),
      ...(!isNullOrEmpty(selectedGmailRecords[indexNumbers?.ZERO]?.Bcc)
        ? { bcc: [selectedGmailRecords[indexNumbers?.ZERO]?.Bcc] }
        : {}),
      subject: selectedGmailRecords[indexNumbers?.ZERO]?.subject,
      content: selectedGmailRecords[indexNumbers?.ZERO]?.snippet,
    };
    try {
      await PostLinkToDealGmail({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Link with Deal successfully', {
        variant: 'success',
      });
      setIsLinkToDealModal(false);
      dispatch(setSelectedGmailRecords([]));
      reset();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={selectedGmailRecords?.length === 0 ? true : false}
        classes={{ outlined: 'outlined_btn' }}
        // sx={styles(theme, selectedGmailRecords?.length > 1)}
        style={{ height: '36px' }}
        color="inherit"
      >
        Actions
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {tabName === CREATE_EMAIL_TYPES?.TRASH ||
        tabName === CREATE_EMAIL_TYPES?.DRAFT ? null : (
          <>
            <MenuItem
              onClick={() => {
                handelMailClick(), handleClose();
              }}
            >
              {' '}
              Mark as {selectedGmailRecords[0]?.readMessage
                ? 'Read'
                : 'unread'}{' '}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsLinkToDealModal(true), handleClose();
              }}
              disabled={selectedGmailRecords?.length > 1}
            >
              Link to deal
            </MenuItem>
            {/* <MenuItem
              disabled={selectedGmailRecords?.length > 1}
              onClick={() => {
                handleClose();
                setIsOpenSendEmailDrawer(true);
                setMailType(CREATE_EMAIL_TYPES?.REPLY);
              }}
            >
              {' '}
              Reply{' '}
            </MenuItem> */}
            {/* <MenuItem
              disabled={selectedGmailRecords?.length > 1}
              onClick={() => {
                handleClose();
                setIsOpenSendEmailDrawer(true);
                setMailType(CREATE_EMAIL_TYPES?.FORWARD);
              }}
            >
              {' '}
              Forward{' '}
            </MenuItem> */}
          </>
        )}
        <MenuItem onClick={() => setIsDeleteModalOpen(true)}> Delete </MenuItem>
        {tabName === CREATE_EMAIL_TYPES?.TRASH && (
          <MenuItem onClick={handleSubMenuClick}> Move to </MenuItem>
        )}
      </Popover>
      <Popover
        open={Boolean(subMenuAnchorEl)}
        anchorEl={subMenuAnchorEl}
        onClose={handleCloseSubMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            setIsRestoreEmail(true);
          }}
        >
          Indox
        </MenuItem>
      </Popover>

      <CommonModal
        open={isLinkToDealModal}
        title="Link to deal"
        okText="Save"
        footer
        cancelText="Cancel"
        handleClose={() => setIsLinkToDealModal(false)}
        handleCancel={() => setIsLinkToDealModal(false)}
        handleSubmit={handleSubmit(onSubmit)}
        isLoading={loadingLinkToDeal}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {FilterData()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={item?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonModal>

      <AlertModals
        type={'Restore'}
        typeImage={<WarningIcon />}
        message={'Are you sure you want to restore email.'}
        open={isRestoreEmail}
        disabled={false}
        handleClose={() => setIsRestoreEmail(false)}
        loading={loadingRestore}
        handleSubmitBtn={handelRestore}
      />

      <AlertModals
        type={'Delete'}
        typeImage={<WarningIcon />}
        message={`Are you sure you want to ${
          tabName === 'trash' ? 'Permanently delete' : 'delete'
        }  ${selectedGmailRecords?.length > 1 ? 'these' : 'this'} Email ?.`}
        open={isDeleteModalOpen}
        disabled={false}
        handleClose={() => setIsDeleteModalOpen(false)}
        loading={loadingDelete || loadingPermanentlyDelete}
        handleSubmitBtn={handelDelete}
      />

      <SendEmailDrawer
        openDrawer={isOpenSendEmailDrawer}
        setOpenDrawer={setIsOpenSendEmailDrawer}
        drawerType={mailType}
        setMailType={setMailType}
      />
    </>
  );
};

export default ActionBtn;
