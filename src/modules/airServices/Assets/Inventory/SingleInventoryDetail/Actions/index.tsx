import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { Typography, useTheme } from '@mui/material';
import { DropdownIcon } from '@/assets/icons';
import DeleteInventory from './DeleteInventory';
import useSingleInventoryDetail from '../useSingleInventoryDetail';

const Actions = () => {
  const theme = useTheme();
  const {
    anchorEl,
    handleClose,
    handleActionClick,
    handleAction,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDelete,
  } = useSingleInventoryDetail();
  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleActionClick}
        endIcon={<DropdownIcon />}
        color="secondary"
      >
        Actions
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key={uuidv4()} onClick={() => handleAction('edit')}>
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme.palette.grey?.[600]}
          >
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          key={uuidv4()}
          onClick={() => handleAction('delete')}
          sx={{
            '&.MuiMenuItem-root': {
              paddingRight: 4,
            },
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme.palette.grey?.[600]}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
      {
        <DeleteInventory
          isDeleteModalOpen={isDeleteModalOpen}
          handleDelete={handleDelete}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      }
    </div>
  );
};

export default Actions;
