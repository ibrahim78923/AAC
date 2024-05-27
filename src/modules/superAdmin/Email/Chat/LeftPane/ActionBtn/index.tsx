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
import { CREATE_EMAIL_TYPES, EMAIL_TABS_TYPES } from '@/constants';
import { AlertModals } from '@/components/AlertModals';
import { WarningIcon } from '@/assets/icons';
import { useMoveFolderOtherEmailMutation } from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';

const ActionBtn = ({ filteredData }: any) => {
  const mailTabType: any = useAppSelector(
    (state: any) => state?.email?.mailTabType,
  );
  const selectedRecords: any = useAppSelector(
    (state: any) => state?.email?.selectedRecords,
  );
  const tabName = mailTabType?.display_name?.toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [isLinkToDealModal, setIsLinkToDealModal] = useState(false);
  const [isRestoreEmail, setIsRestoreEmail] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [moveFolderOtherEmail, { isLoading: loadingRestore }] =
    useMoveFolderOtherEmailMutation();

  const handelRestore = async () => {
    const ids =
      selectedRecords && selectedRecords?.map((message: any) => message?.id);
    const payload = {
      messageId: ids,
      folderId: EMAIL_TABS_TYPES?.DRAFTS,
    };
    try {
      await moveFolderOtherEmail({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Email restore successfully', {
        variant: 'success',
      });
      setIsRestoreEmail(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const handelDelete = async () => {
    const ids =
      selectedRecords && selectedRecords?.map((message: any) => message?.id);

    const result = filteredData?.find(
      (filterData: any) => filterData?.display_name?.toLowerCase() === 'trash',
    );
    const payload = {
      messageId: ids,
      folderId: result?.id,
    };
    try {
      await moveFolderOtherEmail({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Email restore successfully', {
        variant: 'success',
      });
      setIsRestoreEmail(false);
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
        // sx={styles(theme, selectedRecords?.length > 1)}
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
        {tabName === CREATE_EMAIL_TYPES?.TRASH ? null : (
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
            <MenuItem disabled={selectedRecords?.length > 1}> Reply </MenuItem>
            <MenuItem disabled={selectedRecords?.length > 1}>
              {' '}
              Forward{' '}
            </MenuItem>
          </>
        )}
        <MenuItem onClick={() => setIsDeleteModalOpen(true)}> Delete </MenuItem>
        {tabName === CREATE_EMAIL_TYPES?.TRASH && (
          <MenuItem onClick={() => setIsRestoreEmail(true)}> Restore </MenuItem>
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
          selectedRecords.length > 1 ? 'these' : 'this'
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
