import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import TanstackTable from '@/components/Table/TanstackTable';
import { vouchersColumns } from './Vouchers.data';
import { useVouchers } from './useVouchers';
import { AddVouchers } from './AddVouchers';
import { Filters } from './Filters';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Vouchers = () => {
  const {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    vouchersMetaData,
    isFetching,
    isSuccess,
    isError,
    isLoading,
    vouchers,
    handleVoucherClick,
    setFilterValues,
    filterValues,
    handleEditVoucher,
    handleDeleteVoucher,
    isPortal,
    setIsPortal,
    handleDeleteSubmit,
    checkActionPermissions,
  } = useVouchers();
  return (
    <>
      <PageTitledHeader
        title="Vouchers"
        addTitle="Add"
        hasStartIcon
        createPermissionKey={[
          AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.ADD_VOUCHER,
        ]}
        handleAction={() => setIsPortal({ upsert: true })}
      >
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.APPLY_FILTERS,
          ]}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FilterListIcon />}
            className="small"
            onClick={() => setIsPortal({ filter: true })}
          >
            Filters
          </Button>
        </PermissionsGuard>
      </PageTitledHeader>
      <TanstackTable
        columns={vouchersColumns(
          handleVoucherClick,
          handleEditVoucher,
          handleDeleteVoucher,
          checkActionPermissions,
        )}
        data={vouchers}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        currentPage={page}
        count={vouchersMetaData?.pages}
        pageLimit={pageLimit}
        totalRecords={vouchersMetaData?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
      />
      {isPortal?.delete && (
        <AlertModals
          open={isPortal?.delete}
          type={ALERT_MODALS_TYPE?.DELETE}
          handleSubmitBtn={handleDeleteSubmit}
          handleClose={() => setIsPortal({})}
          message="Are you sure you want to delete this voucher?"
        />
      )}
      {isPortal?.upsert && (
        <AddVouchers
          addVouchersOpen={isPortal}
          setAddVouchersOpen={setIsPortal}
        />
      )}
      {isPortal?.filter && (
        <Filters
          filtersOpen={isPortal?.filter}
          setFiltersOpen={setIsPortal}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          setPage={setPage}
        />
      )}
    </>
  );
};
