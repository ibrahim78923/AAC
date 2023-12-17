import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box, Grid, Typography } from '@mui/material';
import {
  voucherRedemptionsColumns,
  voucherRedemptionsData,
} from './VoucherRedemptionsList.data';
import { useVoucherRedemptionsList } from './useVoucherRedemptionsList';

export const VoucherRedemptionsList = () => {
  const { page, setPage, pageLimit, setPageLimit, router } =
    useVoucherRedemptionsList();
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
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight={500} color="slateBlue.main">
            50 Dollars reward:
          </Typography>
          <Typography variant="body2" color="custom.main">
            VEf12UYBN
          </Typography>
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
              <Search label="search" />
            </Box>
            <TanstackTable
              columns={voucherRedemptionsColumns}
              data={voucherRedemptionsData}
              isLoading={false}
              isFetching={false}
              isError={false}
              isSuccess={true}
              currentPage={page}
              count={2}
              pageLimit={pageLimit}
              totalRecords={4}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isPagination
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
