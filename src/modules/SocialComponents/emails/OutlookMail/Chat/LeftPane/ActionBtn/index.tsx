import { useState } from 'react';

import {
  Popover,
  Button,
  MenuItem,
  Typography,
  TextField,
  Menu,
  CircularProgress,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CommonModal from '@/components/CommonModal';
import { useAppSelector } from '@/redux/store';
import { CREATE_EMAIL_TYPES, OUTLOOK_EMAIL_TABS_TYPES } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { WarningIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteEmailOutlookMutation,
  usePatchOutlookMoveToFolderMutation,
} from '@/services/commonFeatures/email/outlook';
import { useDispatch } from 'react-redux';
import {
  setActiveRecord,
  setCurrentEmailAssets,
  setSelectedRecords,
} from '@/redux/slices/email/outlook/slice';

const ActionBtn = ({
  sortedData,
  setIsOpenSendEmailDrawer,
  setMailType,
}: any) => {
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
    try {
      await deleteEmailOutlook({
        body: {
          messageIds: ids,
        },
      })?.unwrap();
      enqueueSnackbar('Mail successfully move to trash ', {
        variant: 'success',
      });
      dispatch(setSelectedRecords([]));
      dispatch(setActiveRecord({}));
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
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
          // from: `${obj?.from?.emailAddress?.name} ${'<'}
          //                                        ${obj?.from?.emailAddress?.address}
          //                                        ${'>'}`,
          // sent: obj?.createdDateTime,
          // to: `<>`,
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
            <MenuItem> Mark as Read </MenuItem>
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
      >
        <Typography>Deal</Typography>
        <TextField placeholder="Search Deal" fullWidth size="small" />
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

      {/* <MenuItem onClick={handelMoveToFolder}>Inbox</MenuItem>
        <MenuItem onClick={handelMoveToFolder}>Sent</MenuItem>
        <MenuItem onClick={handelMoveToFolder}>Drafts</MenuItem> */}

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
          selectedRecords?.length > 1 ? 'these' : 'this'
        } record ?.`}
        open={isDeleteModalOpen}
        disabled={false}
        handleClose={() => setIsDeleteModalOpen(false)}
        loading={loadingRestore}
        handleSubmitBtn={handelDelete}
      />
    </>
  );
};

export default ActionBtn;
