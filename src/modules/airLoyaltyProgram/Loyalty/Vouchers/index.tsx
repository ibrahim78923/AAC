import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import TanstackTable from '@/components/Table/TanstackTable';
import { vouchersColumns } from './Vouchers.data';
import { VoucherCardBg } from '@/assets/images';
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
    isFetching,
    isSuccess,
    isError,
    isLoading,
    vouchers,
    onSwitchChange,
    switchLoading,
    setFilterValues,
    filterValues,
    handlePrintVoucher,
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
            '.*': {
              printColorAdjust: 'exact',
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
            columns={vouchersColumns(
              onSwitchChange,
              switchLoading,
              handlePrintVoucher,
            )}
            data={vouchers}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess || true}
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
          <Grid
            container
            height={'316px'}
            width={'738px'}
            display={'flex'}
            position={'absolute'}
            zIndex={100}
            sx={{
              backgroundImage: `url(${VoucherCardBg.src})`,
              backgroundPosition: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%',
            }}
          >
            <Grid item xs={6} p={3}>
              <Typography color={'white'} variant="h1" mb={2}>
                {' '}
                Enjoy Mighty Zinger
              </Typography>
              <Typography color={'white'} variant="body4">
                Under this revised policy, if an employee takes leave on either
                a Friday or the following Monday
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={1}
            >
              <Typography color={'white'} variant="h6">
                VEf12UYBN
              </Typography>
              <Typography color={'white'} variant="h4">
                Expiry Date
              </Typography>
              <Typography color={'white'} variant="body1">
                20/2/2024
              </Typography>
              <Typography color={'white'} variant="h4">
                No. of Redemptions
              </Typography>
              <Typography color={'white'} variant="body1">
                04
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddVouchers
        addVouchersOpen={addVouchersOpen}
        setAddVouchersOpen={setAddVouchersOpen}
      />
      {filtersOpen && (
        <Filters
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          setPage={setPage}
        />
      )}
    </>
  );
};
