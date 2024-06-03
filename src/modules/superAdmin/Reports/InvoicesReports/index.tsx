import Search from '@/components/Search';
import { Box, Card, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import TanstackTable from '@/components/Table/TanstackTable';
import { usersColumns } from './useInvoicesReports.data';
import Link from 'next/link';
import InvoicesAnalystGraph from './InvoicesAnalystGraph';
import useInvoicesReports from './useInvoicesReports';

const InvoicesReports = () => {
  const {
    searchBy,
    setSearchBy,
    setPage,
    setLimit,
    invoicesReportsData,
    invoicesReportsList,
    invoicesReportsGraph,
    isLoading,
    isSuccess,
    isFetching,
    resetFilters,
    filter,
    setFilter,
  }: any = useInvoicesReports();

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box mt={1}>
          <Link href="/super-admin/reports">
            <ArrowBack />
          </Link>
        </Box>
        <Typography variant="h3">Invoices Report</Typography>
      </Box>
      <Card sx={{ mb: '30px' }}>
        <InvoicesAnalystGraph
          invoicesReportsGraph={invoicesReportsGraph}
          filter={filter}
          setFilter={setFilter}
          resetFilters={resetFilters}
        />
      </Card>
      <Card>
        <Box
          display="flex"
          flexWrap={'wrap'}
          justifyContent="space-between"
          alignItems="center"
          mx={2}
          my={1}
        >
          <Typography variant="h4">Overview</Typography>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={260}
          />
        </Box>
        <Box>
          <TanstackTable
            columns={usersColumns}
            data={invoicesReportsList}
            isPagination
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setLimit}
            count={invoicesReportsData?.data?.meta?.pages}
            pageLimit={invoicesReportsData?.data?.meta?.limit}
            totalRecords={invoicesReportsData?.data?.meta?.total}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isFetching={isFetching}
            currentPage={invoicesReportsData?.data?.meta?.page}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default InvoicesReports;
