import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Grid } from '@mui/material';
import { voucherRedemptionsColumns } from './VoucherRedemptionsList.data';
import { useVoucherRedemptionsList } from './useVoucherRedemptionsList';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';

export const VoucherRedemptionsList = () => {
  const {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    router,
    lazyGetVoucherRedemptionListStatus,
    handleSearch,
  } = useVoucherRedemptionsList();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageTitledHeader
            title="Redeemed Vouchers"
            canMovedBack
            moveBack={() => router?.push(AIR_LOYALTY_PROGRAM?.VOUCHERS)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            border="1px solid"
            borderColor="custom.off_white_three"
            borderRadius={2}
            mt={3}
          >
            <Box
              p="0.75rem 1.5rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1.5}
            >
              <Search label="Search Here" setSearchBy={handleSearch} />
            </Box>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS,
              ]}
            >
              <TanstackTable
                columns={voucherRedemptionsColumns}
                data={lazyGetVoucherRedemptionListStatus?.data?.data?.vouchers}
                isLoading={lazyGetVoucherRedemptionListStatus?.isLoading}
                isFetching={lazyGetVoucherRedemptionListStatus?.isFetching}
                isError={lazyGetVoucherRedemptionListStatus?.isError}
                isSuccess={lazyGetVoucherRedemptionListStatus?.isSuccess}
                currentPage={page}
                count={
                  lazyGetVoucherRedemptionListStatus?.data?.data?.meta?.pages
                }
                pageLimit={pageLimit}
                totalRecords={
                  lazyGetVoucherRedemptionListStatus?.data?.data?.meta?.total
                }
                onPageChange={(page: any) => setPage(page)}
                setPage={setPage}
                setPageLimit={setPageLimit}
                isPagination
              />
            </PermissionsGuard>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
