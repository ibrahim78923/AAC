import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import AddCard from './AddCard';
import usePaymentMethods from './usePaymentMethods';
import { DropdownIcon } from '@/assets/icons';
import { paymentData } from '@/mock/modules/SubscriptionAndInvoices';
import { AlertModals } from '@/components/AlertModals';
import { styles } from './PaymentMethod.style';
import { useState } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';

const PaymentMethods = () => {
  const {
    open,
    anchorEl,
    handleActionsClick,
    handleClose,
    openAddCard,
    setOpenEditCard,
    handleOpenAddCard,
    handleCloseAddCard,
    openEditCard,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    getRowValues,
    isChecked,
    setOpenAddCard,
    isGetRowValues,
  } = usePaymentMethods();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Box sx={styles?.paymentsTableWrapper}>
        <Box sx={styles?.paymentsHeader}>
          <Typography variant="h4" sx={styles?.paymentTitle}>
            Payment Methods
          </Typography>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS?.PAYMENT_METHODS_ADD_CARD,
            ]}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddCard}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'fit-content',
                  lg: 'fit-content',
                  md: 'fit-content',
                },
              }}
            >
              Add a card
            </Button>
          </PermissionsGuard>
        </Box>

        <Box sx={styles?.tableToolbar}>
          <Box sx={styles?.tableSearch}>
            <Search
              searchBy={searchTerm}
              setSearchBy={setSearchTerm}
              label="Search here"
              fullWidth
              size="small"
            />
          </Box>
          {/* <Box sx={styles?.tableToolbarActions}> */}

          <Button
            size="small"
            onClick={handleActionsClick}
            sx={styles?.actionButton}
            endIcon={<DropdownIcon />}
            disabled={!isChecked}
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
            <MenuItem
              onClick={() => {
                setOpenAddCard(true);
                setOpenEditCard('Edit');
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
          </Menu>
        </Box>

        <TanstackTable columns={getRowValues} data={paymentData} isPagination />
      </Box>
      <AddCard
        open={openAddCard}
        onClose={handleCloseAddCard}
        openEditCard={openEditCard}
        setOpenAddCard={setOpenAddCard}
        isGetRowValues={isGetRowValues}
      />
      <AlertModals
        message="Are you sure you want to delete this payment method ?"
        type="delete"
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleCloseDeleteModal}
      />
    </>
  );
};

export default PaymentMethods;
