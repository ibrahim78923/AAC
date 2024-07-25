import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useBankAccounts from '../useBankAccounts';
import { AlertModals } from '@/components/AlertModals';
import { DeleteIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import useActionDropDown from './useActionDropDown';
import { ActionDropDownI } from '../BankAccount.interface';

const ActionDropDown = (props: ActionDropDownI) => {
  const {
    setIsOpenAddAccountDrawer,
    checkedRows,
    setCheckedRows,
    deleteAccountLoading,
    deleteReceiverBankAccount,
  } = props;

  const {
    selectedValue,
    handleClick,
    handleClose,
    isDeleteModal,
    setIsDeleteModal,
  } = useBankAccounts();

  const { handleBulkDelete, handleConfirmDelete } = useActionDropDown(
    setCheckedRows,
    checkedRows,
    deleteReceiverBankAccount,
    setIsDeleteModal,
  );

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      {checkedRows?.length > 1 ? (
        <LoadingButton
          className="small"
          variant="outlined"
          color="inherit"
          startIcon={<DeleteIcon />}
          onClick={handleBulkDelete}
          loading={deleteAccountLoading}
        >
          Delete
        </LoadingButton>
      ) : (
        <>
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            onClick={handleClick}
            disabled={checkedRows?.length === 0 ? true : false}
            sx={{ width: { sm: '112px', xs: '100%' } }}
          >
            Actions
            <ArrowDropDown />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={selectedValue}
            open={Boolean(selectedValue)}
            onClose={handleClose}
            sx={{
              '.MuiPopover-paper': {
                minWidth: '115px',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setIsOpenAddAccountDrawer({
                  isToggle: true,
                  recId: checkedRows[0],
                  type: 'edit',
                });
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setIsDeleteModal(true);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      )}
      {isDeleteModal && (
        <AlertModals
          type="delete"
          message="Are you sure you want to Delete this?"
          cancelBtnText="Cancel"
          submitBtnText="Delete"
          open={isDeleteModal}
          handleClose={() => setIsDeleteModal(false)}
          handleSubmitBtn={handleConfirmDelete}
          loading={deleteAccountLoading}
        />
      )}
    </Box>
  );
};

export default ActionDropDown;
