import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import AddCard from './AddCard';
import usePaymentMethods from './usePaymentMethods';
import { DropdownIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { styles } from './PaymentMethod.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_SUBSCRIPTION_AND_INVOICE_PERMISSIONS } from '@/constants/permission-keys';
import { isNullOrEmpty } from '@/utils';
import { useGetPaymentCardByIdQuery } from '@/services/orgAdmin/subscription-and-invoices';

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
    setOpenAddCard,
    isGetRowValues,
    setIsGetRowValues,
    dataPaymentCard,
    searchValue,
    setSearchValue,
    loadingPaymentCard,
    isFetching,
    setPageLimit,
    setPage,
    loadingDelete,
    handleDelete,
    openDefault,
    handleCloseDefaultModal,
    handleUpdate,
    handleOpenDefaultModal,
    loadingUpdate,
  } = usePaymentMethods();

  const { data } = useGetPaymentCardByIdQuery(
    { id: isGetRowValues[0] },
    { skip: isNullOrEmpty(isGetRowValues) },
  );

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
              searchBy={searchValue}
              setSearchBy={setSearchValue}
              label="Search by name"
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
            disabled={isNullOrEmpty(isGetRowValues)}
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
                setOpenEditCard('View');
                handleClose();
              }}
            >
              View
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
            {!data?.data?.isDefault && (
              <MenuItem onClick={handleOpenDefaultModal}>
                Set as Default
              </MenuItem>
            )}
          </Menu>
        </Box>

        <TanstackTable
          columns={getRowValues}
          data={dataPaymentCard?.data?.payments ?? []}
          isPagination
          isLoading={loadingPaymentCard}
          isFetching={isFetching}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={dataPaymentCard?.data?.meta?.pages}
          totalRecords={dataPaymentCard?.data?.meta?.total}
          onPageChange={(page: number) => setPage(page)}
          currentPage={dataPaymentCard?.data?.meta?.page}
          pageLimit={dataPaymentCard?.data?.meta?.limit}
        />
      </Box>
      <AddCard
        open={openAddCard}
        onClose={handleCloseAddCard}
        openEditCard={openEditCard}
        setOpenAddCard={setOpenAddCard}
        isGetRowValues={isGetRowValues}
        setIsGetRowValues={setIsGetRowValues}
      />
      <AlertModals
        message={
          data?.data?.isDefault
            ? 'This is Default card Please select other card as Default to delete this.'
            : 'Are you sure you want to delete this payment method ?'
        }
        type={data?.data?.isDefault ? 'Information' : 'delete'}
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSubmitBtn={handleDelete}
        loading={loadingDelete}
        footer={data?.data?.isDefault ? false : true}
      />

      <AlertModals
        message="Are you sure to set this card as default?"
        type={'Information'}
        open={openDefault}
        handleClose={handleCloseDefaultModal}
        handleSubmitBtn={handleUpdate}
        loading={loadingUpdate}
      />
    </>
  );
};

export default PaymentMethods;
