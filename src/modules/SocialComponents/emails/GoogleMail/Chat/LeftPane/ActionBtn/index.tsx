import { useState } from 'react';

import {
  Popover,
  Button,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CommonModal from '@/components/CommonModal';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES, Gmail_CONST } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { WarningIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteGmailMutation,
  usePatchGmailMessageMutation,
} from '@/services/commonFeatures/email/gmail';
import { useDispatch } from 'react-redux';
import {
  setActiveGmailRecord,
  setSelectedGmailRecords,
} from '@/redux/slices/email/gmail/slice';
import SendEmailDrawer from '../../../SendEmail';

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

  const [deleteGmail, { isLoading: loadingDelete }] = useDeleteGmailMutation();

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
      threadIds: [selectedGmailRecords?.map((message: any) => message?.id)],
    };
    try {
      await deleteGmail({ body: payload })?.unwrap();
      enqueueSnackbar('Email Delete successfully', {
        variant: 'success',
      });
      handleClose();
      setIsDeleteModalOpen(false);
      dispatch(setSelectedGmailRecords([]));
      dispatch(setActiveGmailRecord({}));
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
            <MenuItem> Mark as Read </MenuItem>
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
        handleClose={() => setIsLinkToDealModal(false)}
        title="Link to deal"
        okText="Save"
        footer
        cancelText="Cancel"
      >
        <Typography>Deal</Typography>
        <TextField placeholder="Search Deal" fullWidth size="small" />
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
        message={`Are you sure you want to delete ${
          selectedGmailRecords?.length > 1 ? 'these' : 'this'
        } record ?.`}
        open={isDeleteModalOpen}
        disabled={false}
        handleClose={() => setIsDeleteModalOpen(false)}
        loading={loadingDelete}
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
