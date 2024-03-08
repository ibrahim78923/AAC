import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { useInventory } from './useInventory';
import { INVENTORY_LIST_ACTIONS } from './Inventory.data';
import { EXPORT_TYPE } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
        createPermissionKey={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS,
        ]}
        exportPermissionKey={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPORT,
        ]}
        importPermissionKey={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.IMPORT,
        ]}
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
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.SEARCH_AND_FILTER,
                ]}
              >
                <Search label="Search Here" setSearchBy={setSearch} />
              </PermissionsGuard>
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={1.5}
            >
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_ASSETS,
                ]}
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
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.CUSTOMIZED_COLUMN,
                ]}
              >
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
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.SEARCH_AND_FILTER,
                ]}
              >
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
              </PermissionsGuard>
            </Box>
          </Box>
        </Box>
        <br />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ASSETS_LIST_VIEW,
          ]}
        >
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
        </PermissionsGuard>
      </Box>
      {hasInventoryAction &&
        inventoryActionComponent?.[
          router?.query?.inventoryListsAction as string
        ]}
    </>
  );
};

export default Inventory;
