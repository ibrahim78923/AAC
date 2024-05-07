import { Box, Button, Typography, useTheme } from '@mui/material';
import {
  TRANSACTIONS_ACTIONS,
  UserList,
  transactionTableData,
} from './Transactions.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { CirclePlusIcon, ExportIcon, FilterLinesIcon } from '@/assets/icons';
import ImportModal from './TransactionImportDrawer';
import { useTransaction } from './useTransaction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS } from '@/constants/permission-keys';

export const Transactions = () => {
  const theme = useTheme();
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    meta,
    openDrawer,
    setOpenDrawer,
    setTransactionDrawerContent,
  } = useTransaction();
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Typography variant="h3" color="slateBlue.main">
          Gift Card Transactions
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.IMPORT,
            ]}
          >
            <ImportModal />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.ADD_TRANSACTIONS,
            ]}
          >
            <Button
              onClick={() =>
                setOpenDrawer({ isOpen: true, type: TRANSACTIONS_ACTIONS?.ADD })
              }
              startIcon={<CirclePlusIcon />}
              variant="contained"
            >
              Add
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
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
              setSearchBy={setSearch}
              searchBy={search}
            />
          </PermissionsGuard>
          <Box display={'flex'} flexWrap={'wrap'} gap={2}>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.APPLY_FILTERS,
              ]}
            >
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FilterLinesIcon />}
                onClick={() =>
                  setOpenDrawer({
                    isOpen: true,
                    type: TRANSACTIONS_ACTIONS?.FILTER,
                  })
                }
              >
                Filters
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.EXPORT,
              ]}
            >
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ExportIcon />}
                onClick={() =>
                  setOpenDrawer({
                    isOpen: true,
                    type: TRANSACTIONS_ACTIONS?.EXPORT,
                  })
                }
              >
                Export
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_TRANSACTIONS_PERMISSIONS?.VIEW_DETAILS,
          ]}
        >
          <TanstackTable
            data={transactionTableData}
            columns={UserList}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess}
            isPagination
            count={meta?.pages}
            pageLimit={limit}
            currentPage={page}
            totalRecords={meta?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setLimit}
          />
        </PermissionsGuard>
      </Box>
      {openDrawer?.isOpen && setTransactionDrawerContent()}
    </Box>
  );
};
