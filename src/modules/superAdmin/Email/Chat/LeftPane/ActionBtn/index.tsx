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
import { CREATE_EMAIL_TYPES } from '@/constants';

const ActionBtn = () => {
  const mailTabType: any = useAppSelector(
    (state: any) => state?.email?.mailTabType,
  );
  const selectedRecords = useAppSelector(
    (state: any) => state?.email?.selectedRecords,
  );
  const tabName = mailTabType?.display_name.toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [isLinkToDealModal, setIsLinkToDealModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem> Delete </MenuItem>
        {tabName === CREATE_EMAIL_TYPES?.TRASH && (
          <MenuItem> Restore </MenuItem>
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
    </>
  );
};

export default ActionBtn;
