import { useRouter } from 'next/router';
import { useState } from 'react';
// import { useTheme } from '@mui/material';
import {
  INVENTORY_LIST_ACTIONS,
  data,
  inventoryListsColumnsFunction,
} from './Inventory.data';
import { CustomizeInventoryColumn } from './CustomizeInventoryColumn';
import { FilterInventory } from './FilterInventory';
import { AIR_SERVICES } from '@/constants';

export const useInventory = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const router = useRouter();
  const { push } = useRouter();

  const handleAddInventory = () => {
    push(AIR_SERVICES?.ADD_INVENTORY);
  };

  const [inventoryListsColumns, setInventoryListsColumns] = useState(
    inventoryListsColumnsFunction(
      inventoryData,
      setInventoryData,
      data,
      router,
    ),
  );
  const inventoryListsColumnsPersist = inventoryListsColumnsFunction(
    inventoryData,
    setInventoryData,
    data,
    router,
  );
  const renderComponent: any = {
    [INVENTORY_LIST_ACTIONS?.FILTER]: (
      <FilterInventory
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        onClose={() => {
          const { tableAction, ...restQueries } = router?.query;
          router.push({
            pathname: router?.pathname,
            query: {
              ...restQueries,
            },
          });
          setIsDrawerOpen(false);
        }}
      />
    ),
    [INVENTORY_LIST_ACTIONS?.CUSTOMIZE_COLUMN]: (
      <CustomizeInventoryColumn
        isCustomizeModalOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleClose={() => {
          const { tableAction, ...restQueries } = router?.query;
          router?.push({
            pathname: router?.pathname,
            query: {
              ...restQueries,
            },
          });
          setIsDrawerOpen(false);
        }}
        onClose={() => {
          const { tableAction, ...restQueries } = router?.query;
          router?.push({
            pathname: router?.pathname,
            query: {
              ...restQueries,
            },
          });
          setIsDrawerOpen(false);
        }}
        inventoryListsColumns={inventoryListsColumns}
        columns={inventoryListsColumns?.slice(1)}
        setInventoryListsColumns={setInventoryListsColumns}
        inventoryListsColumnsPersist={inventoryListsColumnsPersist}
      />
    ),
  };
  const openDrawer = (tableActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        tableAction: tableActionQuery,
      },
    });
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 100);
  };
  return {
    handleAddInventory,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    renderComponent,
    openDrawer,
    openDeleteModal,
    setOpenDeleteModal,
    searchValue,
    SetSearchValue,
    inventoryListsColumns,
    data,
    inventoryData,
    setInventoryData,
  };
};
