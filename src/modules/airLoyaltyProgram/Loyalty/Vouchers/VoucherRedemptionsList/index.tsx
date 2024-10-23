import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Grid, Typography } from '@mui/material';
import {
  voucherRedemptionsColumns,
  voucherRedemptionsData,
} from './VoucherRedemptionsList.data';
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
    voucherRedemptionListMetaData,
    setSearch,
  } = useVoucherRedemptionsList();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageTitledHeader
            title="Maryam"
            canMovedBack
            moveBack={() => router?.push(AIR_LOYALTY_PROGRAM?.VOUCHERS)}
          />
        </Grid>
        <PermissionsGuard
          permissions={[AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS]}
        >
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={500} color="slateBlue.main">
              50 Dollars reward:
            </Typography>
            <Typography variant="body2" color="custom.main">
              VEf12UYBN
            </Typography>
          </Grid>
        </PermissionsGuard>
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
              <Search label="search" setSearchBy={setSearch} />
            </Box>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS,
              ]}
            >
              <TanstackTable
                columns={voucherRedemptionsColumns}
                data={voucherRedemptionsData}
                isLoading={lazyGetVoucherRedemptionListStatus?.isLoading}
                isFetching={lazyGetVoucherRedemptionListStatus?.isFetching}
                isError={lazyGetVoucherRedemptionListStatus?.isError}
                isSuccess={
                  lazyGetVoucherRedemptionListStatus?.isSuccess || true
                }
                currentPage={page}
                count={voucherRedemptionListMetaData?.pages}
                pageLimit={pageLimit}
                totalRecords={voucherRedemptionListMetaData?.total}
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
