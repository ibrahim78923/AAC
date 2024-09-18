import { useState } from 'react';

import {
  Popover,
  Button,
  MenuItem,
  Menu,
  CircularProgress,
  Grid,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CommonModal from '@/components/CommonModal';
import { useAppSelector } from '@/redux/store';
import {
  CREATE_EMAIL_TYPES,
  indexNumbers,
  OUTLOOK_EMAIL_TABS_TYPES,
} from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { WarningIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteEmailOutlookMutation,
  useLazyGetAllDealsAsyncQuery,
  usePatchOutlookEmailMessageMutation,
  usePatchOutlookMoveToFolderMutation,
  usePostLinkToDealOutlookMutation,
} from '@/services/commonFeatures/email/outlook';
import { useDispatch } from 'react-redux';
import {
  setActiveRecord,
  setCurrentEmailAssets,
  setFilterMailList,
  setSelectedRecords,
  setUpdateMailList,
} from '@/redux/slices/email/outlook/slice';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import {
  emailLinkToDealDefaultValues,
  emailLinkToDealSchema,
} from './ActionBtn.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface ActionBtnPropsI {
  sortedData: any[];
  mailType: string;
  setMailType: (type: string) => void;
  setIsOpenSendEmailDrawer: (isOpen: boolean) => void;
  isOpenSendEmailDrawer: boolean;
  handelRefresh: () => Promise<void>;
}

const ActionBtn = ({
  sortedData,
  setIsOpenSendEmailDrawer,
  setMailType,
}: ActionBtnPropsI) => {
  const dispatch = useDispatch();
  const mailTabType: any = useAppSelector(
    (state: any) => state?.outlook?.mailTabType,
  );
  const selectedRecords: any = useAppSelector(
    (state: any) => state?.outlook?.selectedRecords,
  );
  const activeRecord: any = useAppSelector(
    (state: any) => state?.outlook?.activeRecord,
  );

  const selectedFirstRec = selectedRecords[indexNumbers?.ZERO];

  const tabName = mailTabType?.displayName?.toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [isLinkToDealModal, setIsLinkToDealModal] = useState(false);
  const [isRestoreEmail, setIsRestoreEmail] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [mailFolderActiveId, setMailFolderActiveId] = useState<any>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteEmailOutlook, { isLoading: loadingRestore }] =
    useDeleteEmailOutlookMutation();
  const [outlookMoveToFolderMutation, { isLoading: loadingMove }] =
    usePatchOutlookMoveToFolderMutation();

  const handelRestore = async () => {};

  const handelDelete = async () => {
    const ids =
      selectedRecords && selectedRecords?.map((message: any) => message?.id);

    if (
      tabName === OUTLOOK_EMAIL_TABS_TYPES?.TRASH?.toLowerCase() ||
      tabName === OUTLOOK_EMAIL_TABS_TYPES?.DRAFTS?.toLowerCase()
    ) {
      try {
        await deleteEmailOutlook({
          body: {
            messageIds: ids,
          },
        })?.unwrap();
        enqueueSnackbar('Mail permanently deleted', {
          variant: 'success',
        });
        dispatch(setSelectedRecords([]));
        dispatch(setActiveRecord({}));
        setIsDeleteModalOpen(false);
        dispatch(setFilterMailList(ids ? ids : []));
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    } else {
      const deletedItems = sortedData.find(
        (folder: any) =>
          folder &&
          folder?.displayName?.toLowerCase() ===
            OUTLOOK_EMAIL_TABS_TYPES?.TRASH?.toLowerCase(),
      );

      try {
        await outlookMoveToFolderMutation({
          body: {
            mailIds:
              selectedRecords &&
              selectedRecords?.map((message: any) => message?.id),
            folderId: deletedItems?.id,
          },
        })?.unwrap();
        enqueueSnackbar('Mail successfully deleted ', {
          variant: 'success',
        });
        dispatch(setSelectedRecords([]));
        dispatch(setActiveRecord({}));
        setIsDeleteModalOpen(false);
        handleCloseSubMenu();
        handleClose();
        setMailFolderActiveId('');
        dispatch(setFilterMailList(ids ? ids : []));
      } catch (error: any) {
        enqueueSnackbar('Something went wrong !', { variant: 'error' });
      }
    }
  };

  const handelActionReply = () => {
    handleClose();
    setIsOpenSendEmailDrawer(true);
    setMailType(CREATE_EMAIL_TYPES?.REPLY);
    dispatch(
      setCurrentEmailAssets({
        messageId: activeRecord?.id,
        id: activeRecord?.id,
        from: activeRecord?.from?.emailAddress?.address,
        others: {
          subject: activeRecord?.subject,
          body: '',
        },
      }),
    );
  };

  const [anchorElSubMenu, setAnchorElSubMenu] = useState<null | HTMLElement>(
    null,
  );
  const openSubMenu = Boolean(anchorElSubMenu);
  const handleClickSubMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSubMenu(event.currentTarget);
  };
  const handleCloseSubMenu = () => {
    setAnchorElSubMenu(null);
  };

  const handelMoveToFolder = async () => {
    try {
      await outlookMoveToFolderMutation({
        body: {
          mailIds:
            selectedRecords &&
            selectedRecords?.map((message: any) => message?.id),
          folderId: mailFolderActiveId,
        },
      })?.unwrap();
      enqueueSnackbar('Mail successfully move ', {
        variant: 'success',
      });
      dispatch(setSelectedRecords([]));
      dispatch(setActiveRecord({}));
      handleCloseSubMenu();
      handleClose();
      setMailFolderActiveId('');
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const [patchOutlookEmailMessage, { isLoading: readUnreadLoading }] =
    usePatchOutlookEmailMessageMutation();

  const handelReadUnread = async () => {
    try {
      const response = await patchOutlookEmailMessage({
        body: {
          messageId: selectedRecords[0]?.id,
          ...(selectedRecords[0]?.isRead && { unread: true }),
          ...(!selectedRecords[0]?.isRead && { read: true }),
        },
      })?.unwrap();
      dispatch(setUpdateMailList(response?.data));
      dispatch(setSelectedRecords([]));
      dispatch(setActiveRecord({}));
      handleClose();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong while updating message!', {
        variant: 'error',
      });
    }
  };

  const methodsDealsTasks: any = useForm({
    resolver: yupResolver(emailLinkToDealSchema()),
    defaultValues: emailLinkToDealDefaultValues,
  });
  const { handleSubmit, reset } = methodsDealsTasks;

  const [PostLinkToDealOutlook, { isLoading: loadingLinkToDeal }] =
    usePostLinkToDealOutlookMutation();

  const onSubmit = async (values: any) => {
    const payload = {
      provider: 'OUTLOOK',
      threadId: selectedFirstRec?.conversationId,
      dealIds: [values?.linkToDeal?._id],
      from: `${selectedFirstRec?.sender?.emailAddress?.name} <${selectedFirstRec?.sender?.emailAddress?.address}>`,
      to: selectedFirstRec?.toRecipients?.map(
        (to: any) => `${to?.emailAddress?.name} <${to?.emailAddress?.address}>`,
      ),
      cc: selectedFirstRec?.ccRecipients?.map(
        (cc: any) => `${cc?.emailAddress?.name} <${cc?.emailAddress?.address}>`,
      ),
      bcc: selectedFirstRec?.bccRecipients?.map(
        (bcc: any) =>
          `${bcc?.emailAddress?.name} <${bcc?.emailAddress?.address}>`,
      ),
      subject: selectedFirstRec?.subject,
      content: selectedFirstRec?.body?.content,
    };

    try {
      await PostLinkToDealOutlook({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Email association successful', {
        variant: 'success',
      });
      dispatch(setSelectedRecords([]));
      dispatch(setActiveRecord({}));
      reset();
      setIsLinkToDealModal(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const apiQueryUsers = useLazyGetAllDealsAsyncQuery?.();

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={selectedRecords?.length === 0 ? true : false}
        classes={{ outlined: 'outlined_btn' }}
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
        {tabName === OUTLOOK_EMAIL_TABS_TYPES?.TRASH?.toLowerCase() ? null : (
          <>
            <MenuItem
              onClick={handelReadUnread}
              sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              {' '}
              {selectedRecords[0]?.isRead
                ? 'Mark as Unread'
                : 'Mark as Read'}{' '}
              {readUnreadLoading && <CircularProgress size={16} />}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsLinkToDealModal(true), handleClose();
              }}
              disabled={selectedRecords?.length > 1}
            >
              Link to deal
            </MenuItem>
            <MenuItem
              disabled={selectedRecords?.length > 1}
              onClick={handelActionReply}
            >
              {' '}
              Reply{' '}
            </MenuItem>
            <MenuItem disabled={selectedRecords?.length > 1}>
              {' '}
              Forward{' '}
            </MenuItem>
          </>
        )}
        <MenuItem
          onClick={() => {
            setIsDeleteModalOpen(true);
            handleClose();
          }}
        >
          {' '}
          Delete{' '}
        </MenuItem>
        {tabName === OUTLOOK_EMAIL_TABS_TYPES?.TRASH?.toLowerCase() && (
          <MenuItem
            id="basic-button"
            aria-controls={openSubMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubMenu ? 'true' : undefined}
            onClick={handleClickSubMenu}
            component="button"
          >
            {' '}
            Move to{' '}
          </MenuItem>
        )}
      </Popover>

      <CommonModal
        open={isLinkToDealModal}
        handleClose={() => setIsLinkToDealModal(false)}
        title="Link to deal"
        okText="Save"
        footer
        cancelText="Cancel"
        handleSubmit={handleSubmit(onSubmit)}
        isLoading={loadingLinkToDeal}
      >
        <FormProvider
          methods={methodsDealsTasks}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item md={12}>
              <RHFAutocompleteAsync
                label="Deal"
                name="linkToDeal"
                fullWidth
                apiQuery={apiQueryUsers}
                size="small"
                placeholder="Select deal"
                getOptionLabel={(option: any) => option?.name}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </CommonModal>

      <Menu
        id="basic-menu"
        anchorEl={anchorElSubMenu}
        open={openSubMenu}
        onClose={handleCloseSubMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {sortedData?.map((item: any) => (
          <>
            {item && item?.displayName !== OUTLOOK_EMAIL_TABS_TYPES?.TRASH && (
              <>
                <MenuItem
                  sx={{ display: 'flex', gap: '10px' }}
                  key={item?.id}
                  onClick={() => {
                    handelMoveToFolder(), setMailFolderActiveId(item?.id);
                  }}
                >
                  {mailFolderActiveId === item?.id && (
                    <>{loadingMove && <CircularProgress size={15} />}</>
                  )}
                  {item?.displayName}
                </MenuItem>
              </>
            )}
          </>
        ))}
      </Menu>

      <AlertModals
        type={'Restore'}
        typeImage={<WarningIcon />}
        message={'Are you sure you want to restore email.'}
        open={isRestoreEmail}
        handleClose={() => setIsRestoreEmail(false)}
        loading={loadingRestore}
        handleSubmitBtn={handelRestore}
      />

      <AlertModals
        type={'Delete'}
        message={`Are you sure you want to delete ${
          selectedRecords?.length > 1 ? 'these' : 'this'
        } record ?.`}
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        loading={loadingRestore || loadingMove}
        handleSubmitBtn={handelDelete}
      />
    </>
  );
};

export default ActionBtn;
