import { Button, Menu, MenuItem, useTheme } from '@mui/material';
import usePropertyActionButton from './usePropertyActionButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AlertModals } from '@/components/AlertModals';

const PropertyActionButton = () => {
  const theme = useTheme();
  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = usePropertyActionButton();
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="small"
        // disabled={checkedUser?.length > 0 ? false : true}
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '4px',
          color: `${theme?.palette?.custom.main}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0.7rem',
          fontWeight: 500,
          marginY: { xs: '10px', sm: '0px' },
          width: { xs: '100%', sm: 'fit-content' },
        }}
      >
        Actions <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            //     setIsAddUserDrawer({
            //         isToggle: true,
            //         type: DRAWER_TYPES?.EDIT,
            //     });
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleteModalOpen(true);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {isDeleteModalOpen && (
        <AlertModals
          type="delete"
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          message="Are you sure you want to delete this entry?"
          handleSubmitBtn={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyActionButton;
