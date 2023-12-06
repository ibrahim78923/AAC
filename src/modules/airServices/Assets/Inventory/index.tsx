import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import { useInventory } from './useInventory';
import { INVENTORY_LIST_ACTIONS, inventoryListsData } from './Inventory.data';
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
    search,
    setSearch,
    inventoryListsColumnsPersist,
  } = useInventory();
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
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <Search
            label="search"
            width="100%"
            value={search}
            onChange={(e: any) => setSearch(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
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
            onClick={() => setInventoryAction(INVENTORY_LIST_ACTIONS?.FILTER)}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={
          inventoryListsColumnsPersist?.filter(
            (col: any) => inventoryListsColumns?.includes?.(col?.id),
          ) ?? []
        }
        data={lazyGetInventoryStatus?.data?.data?.result ?? inventoryListsData}
        isLoading={lazyGetInventoryStatus?.isLoading}
        currentPage={lazyGetInventoryStatus?.data?.data?.metadata?.page}
        count={lazyGetInventoryStatus?.data?.data?.metadata?.totalPages}
        pageLimit={lazyGetInventoryStatus?.data?.data?.metadata?.limit}
        totalRecords={lazyGetInventoryStatus?.data?.data?.metadata?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetInventoryStatus?.isFetching}
        isError={lazyGetInventoryStatus?.isError}
        isSuccess={lazyGetInventoryStatus?.isSuccess || true}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {hasInventoryAction &&
        inventoryActionComponent?.[
          router?.query?.inventoryListsAction as string
        ]}
    </>
  );
};

export default Inventory;
