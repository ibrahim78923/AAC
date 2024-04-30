import { useState } from 'react';

import {
  Popover,
  Button,
  MenuItem,
  useTheme,
  Typography,
  TextField,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { styles } from './ActionBtn.style';
import CommonModal from '@/components/CommonModal';

const ActionBtn = ({ disableActionBtn }: any) => {
  const theme = useTheme();

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
        disabled={disableActionBtn}
        classes={{ outlined: 'outlined_btn' }}
        sx={styles(theme, disableActionBtn)}
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
        <MenuItem> Mark as Read </MenuItem>
        <MenuItem
          onClick={() => {
            setIsLinkToDealModal(true), handleClose();
          }}
        >
          Link to deal
        </MenuItem>
        <MenuItem> Reply </MenuItem>
        <MenuItem> Forward </MenuItem>
        <MenuItem> Delete </MenuItem>
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
