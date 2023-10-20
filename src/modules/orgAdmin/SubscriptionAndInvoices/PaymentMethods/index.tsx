import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import AddCard from './AddCard';
import EditCard from './EditCard';
import usePaymentMethods from './usePaymentMethods';
import CustomPagination from '@/components/CustomPagination';
import { DropdownIcon } from '@/assets/icons';
import { paymentData } from '@/mock/modules/SubscriptionAndInvoices';
import { AlertModals } from '@/components/AlertModals';
import { columns } from './PaymentMethods.data';
import { styles } from './PaymentMethod.style';

const PaymentMethods = () => {
  const {
    open,
    anchorEl,
    handleActionsClick,
    handleClose,
    openAddCard,
    handleOpenAddCard,
    handleCloseAddCard,
    openEditCard,
    handleOpenEditCard,
    handleCloseEditCard,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = usePaymentMethods();

  return (
    <>
      <Box sx={styles.paymentsTableWrapper}>
        <Box sx={styles.paymentsHeader}>
          <Typography variant="h4" sx={styles.paymentTitle}>
            Payment Methods
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddCard}
          >
            Add a card
          </Button>
        </Box>

        <Box sx={styles.tableToolbar}>
          <Box sx={styles.tableSearch}>
            <Search size="small" />
          </Box>
          <Box sx={styles.tableToolbarActions}>
            <Box>
              <Button
                size="small"
                onClick={handleActionsClick}
                sx={styles.actionButton}
                endIcon={<DropdownIcon />}
              >
                Actions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiList-root': {
                    minWidth: '112px',
                  },
                }}
              >
                <MenuItem onClick={handleOpenEditCard}>Edit</MenuItem>
                <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        <TanstackTable columns={columns} data={paymentData} />

        <CustomPagination
          count={3}
          rowsPerPageOptions={[6, 10, 25, 50, 100]}
          entriePages={paymentData.length}
        />
      </Box>

      <AddCard open={openAddCard} onClose={handleCloseAddCard} />
      <EditCard open={openEditCard} onClose={handleCloseEditCard} />
      <AlertModals
        message="Are you sure you want to delete this payment method?"
        type="delete"
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleCloseDeleteModal}
      />
    </>
  );
};

export default PaymentMethods;
