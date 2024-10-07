import { Box, Button, useTheme } from '@mui/material';
import { UserList, transactionTableData } from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterLinesIcon } from '@/assets/icons';
import { useTransaction } from './useTransaction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TransactionFilter } from './TransactionFilter';

export const Transactions = () => {
  const theme = useTheme();
  const {
    search,
    setSearch,
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
      <PageTitledHeader title={'Gift Card Transactions'} />
      <Box
        sx={{
          border: `.1rem solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box
          m={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1}
        >
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.SEARCH_DETAILS,
            ]}
          >
            <Search
              label="Search Here"
              width={'16.25rem'}
              size="small"
              setSearchBy={setSearch}
              searchBy={search}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.APPLY_FILTERS,
            ]}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterLinesIcon />}
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
