import { Box, Button } from '@mui/material';
import { UserList, transactionTableData } from './Transactions.data';
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
    page,
    setPage,
    limit,
    setLimit,
    meta,
    openDrawer,
    setOpenDrawer,
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
            data={transactionTableData}
            columns={UserList}
            count={meta?.pages}
            pageLimit={limit}
            currentPage={page}
            totalRecords={meta?.total}
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
        />
      )}
    </>
  );
};
