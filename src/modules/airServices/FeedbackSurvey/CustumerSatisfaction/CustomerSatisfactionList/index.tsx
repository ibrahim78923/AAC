import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import {
  customerSupportListColumn,
  feedbackDropdown,
} from './CustomerSatisfactionList.data';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';

export const CustomerSatisfactionList = ({
  search,
  setSearch,
  activeCheck,
  setActiveCheck,
  feedbackTableData = [],
  isLoading,
  isFetching,
  isError,
  isSuccess,
  page,
  setPage,
  limit,
  setLimit,
  meta = {},
}: any) => {
  const router = useRouter();
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Search label="Search here" searchBy={search} setSearchBy={setSearch} />
        <Box display="flex" gap={1}>
          <SingleDropdownButton
            dropdownOptions={feedbackDropdown(activeCheck)}
            disabled={!!!activeCheck?.length}
          />
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
                query: { type: 'customer-satisfaction' },
              })
            }
          >
            Create Survey
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={customerSupportListColumn(
          activeCheck,
          setActiveCheck,
          feedbackTableData,
        )}
        data={feedbackTableData}
        isPagination
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={meta?.pages}
        pageLimit={limit}
        currentPage={page}
        totalRecords={meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
    </>
  );
};
