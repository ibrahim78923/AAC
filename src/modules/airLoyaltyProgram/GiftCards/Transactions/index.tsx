import { Box, Button } from '@mui/material';
import { UserList } from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTransaction } from './useTransaction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TransactionFilter } from './TransactionFilter';

export const Transactions = () => {
  const {
    search,
    handleSearch,
    setPage,
    setLimit,
    openDrawer,
    setOpenDrawer,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    setFilterValues,
    filterValues,
  } = useTransaction();

  return (
    <>
      <PageTitledHeader title={'Gift Cards Transactions'} />
      <Box border={`1px solid`} borderColor={'grey.700'} borderRadius={2}>
        <Box
          p={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
        >
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.SEARCH_DETAILS,
            ]}
          >
            <Search
              label="Search Here"
              size="small"
              setSearchBy={handleSearch}
              searchBy={search}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.APPLY_FILTER,
            ]}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterListIcon />}
              className="small"
              onClick={() => setOpenDrawer(true)}
            >
              Filters
            </Button>
          </PermissionsGuard>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.VIEW_DETAILS,
          ]}
        >
          <TanstackTable
            columns={UserList}
            data={data?.data}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess || true}
            currentPage={data?.data?.meta?.page}
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            totalRecords={data?.data?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setLimit}
            isPagination
          />
        </PermissionsGuard>
      </Box>
      {openDrawer && (
        <TransactionFilter
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          setPage={setPage}
        />
      )}
    </>
  );
};
