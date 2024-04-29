import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import TanstackTable from '@/components/Table/TanstackTable';
import { vouchersColumns, vouchersData } from './Vouchers.data';
import Image from 'next/image';
import { VoucherImage } from '@/assets/images';
import { useVouchers } from './useVouchers';
import { AddVouchers } from './AddVouchers';
import { Filters } from './Filters';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';

export const Vouchers = () => {
  const {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    addVouchersOpen,
    setAddVouchersOpen,
    filtersOpen,
    theme,
    setFiltersOpen,
    vouchersMetaData,
    lazyGetVouchersStatus,
  } = useVouchers();
  return (
    <>
      <Grid
        container
        sx={{
          '@media print': {
            '& .printable-voucher': {
              display: 'flex',
              position: 'fixed',
              top: '-1px',
              left: '-1px',
              zIndex: 1402,
            },
            '& .no-print': {
              display: 'none',
            },
            '@page': {
              size: 'portrait',
            },
          },
        }}
      >
        <Grid item xs={6} className="no-print">
          <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
            Vouchers
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          gap={1}
          justifyContent="flex-end"
          className="no-print"
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
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.ADD_VOUCHER,
            ]}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => setAddVouchersOpen(true)}
              disableElevation
            >
              Add
            </Button>
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12} mt={3} className="no-print">
          <TanstackTable
            columns={vouchersColumns}
            data={vouchersData}
            isLoading={lazyGetVouchersStatus?.isLoading}
            isFetching={lazyGetVouchersStatus?.isFetching}
            isError={lazyGetVouchersStatus?.isError}
            isSuccess={lazyGetVouchersStatus?.isSuccess || true}
            currentPage={page}
            count={vouchersMetaData?.pages}
            pageLimit={pageLimit}
            totalRecords={vouchersMetaData?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isPagination
          />
        </Grid>
        <Grid item xs={12} display="none" className="printable-voucher">
          <Image src={VoucherImage} alt="voucher" />
        </Grid>
      </Grid>
      <AddVouchers
        addVouchersOpen={addVouchersOpen}
        setAddVouchersOpen={setAddVouchersOpen}
      />
      <Filters filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
    </>
  );
};
