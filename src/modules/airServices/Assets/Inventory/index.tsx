import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import { useInventory } from './useInventory';
import { INVENTORY_LIST_ACTIONS } from './Inventory.data';
import { EXPORT_TYPE } from '@/constants/strings';

const Inventory = () => {
  const {
    handleAddInventory,
    router,
    hasInventoryAction,
    setInventoryAction,
    inventoryActionComponent,
    inventoryListsColumns,
    selectedInventoryLists,
    getInventoryListDataExport,
    lazyGetInventoryStatus,
    setPage,
    setPageLimit,
    setSearch,
    inventoryListsColumnsPersist,
    theme,
  }: any = useInventory();
  return (
    <>
      <PageTitledHeader
        title={'Inventory'}
        addTitle={'Add'}
        hasImport
        hasExport
        handleExcelExport={() => getInventoryListDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getInventoryListDataExport?.(EXPORT_TYPE?.CSV)}
        handleAction={handleAddInventory}
        handleImport={() =>
          setInventoryAction?.(INVENTORY_LIST_ACTIONS?.IMPORT)
        }
      />
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <Box px={2}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={1.5}
          >
            <Box>
              <Search
                label="Search Here"
                width="100%"
                setSearchBy={setSearch}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={1.5}
            >
              <Button
                color="secondary"
                variant="outlined"
                disabled={!!!selectedInventoryLists?.length}
                onClick={() => {
                  setInventoryAction(INVENTORY_LIST_ACTIONS?.DELETE);
                }}
              >
                Delete
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<CustomizeSharedIcon />}
                onClick={() =>
                  setInventoryAction(INVENTORY_LIST_ACTIONS?.CUSTOMIZE_COLUMN)
                }
              >
                Customize
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<FilterSharedIcon />}
                onClick={() =>
                  setInventoryAction(INVENTORY_LIST_ACTIONS?.FILTER)
                }
              >
                Filter
              </Button>
            </Box>
          </Box>
        </Box>
        <br />
        <TanstackTable
          columns={
            inventoryListsColumnsPersist?.filter(
              (col: any) => inventoryListsColumns?.includes?.(col?.id),
            ) ?? []
          }
          data={lazyGetInventoryStatus?.data?.data?.inventories}
          isLoading={lazyGetInventoryStatus?.isLoading}
          currentPage={lazyGetInventoryStatus?.data?.data?.meta?.page}
          count={lazyGetInventoryStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetInventoryStatus?.data?.data?.meta?.limit}
          totalRecords={lazyGetInventoryStatus?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetInventoryStatus?.isFetching}
          isError={lazyGetInventoryStatus?.isError}
          isSuccess={lazyGetInventoryStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
      {hasInventoryAction &&
        inventoryActionComponent?.[
          router?.query?.inventoryListsAction as string
        ]}
    </>
  );
};

export default Inventory;
