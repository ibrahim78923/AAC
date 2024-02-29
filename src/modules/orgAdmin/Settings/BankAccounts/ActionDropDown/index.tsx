import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useBankAccounts from '../useBankAccounts';
import { AlertModals } from '@/components/AlertModals';
import { DeleteIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetReceiverBankAccountsByIdQuery } from '@/services/orgAdmin/settings/receivers-bank-acconts';

const ActionDropDown = (props: any) => {
  const { setIsOpenAddAccountDrawer, checkedRows, setCheckedRows } = props;

  const {
    selectedValue,
    handleClick,
    handleClose,
    isDeleteModal,
    setIsDeleteModal,
    deleteReceiverBankAccount,
  } = useBankAccounts();

  const { data: EditAccountData } =
    useGetReceiverBankAccountsByIdQuery(checkedRows);

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      {checkedRows?.length > 1 ? (
        <Button
          className="small"
          variant="outlined"
          color="inherit"
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteReceiverBankAccount({ body: { ids: checkedRows } });
            setCheckedRows([]);
            enqueueSnackbar(`Accounts deleted successfully`, {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            });
          }}
        >
          Delete
        </Button>
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
                  data: EditAccountData?.data,
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
          handleSubmitBtn={() => {
            setIsDeleteModal(false);
            deleteReceiverBankAccount({ body: { ids: checkedRows } });
            setCheckedRows([]);
            enqueueSnackbar(`Account deleted successfully`, {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            });
          }}
        />
      )}
    </Box>
  );
};

export default ActionDropDown;
