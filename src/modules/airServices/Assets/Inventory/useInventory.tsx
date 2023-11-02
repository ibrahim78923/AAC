import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { data, inventoryListsColumnsFunction } from './Inventory.data';
import { CustomizeInventory } from './CustomizeInventory';
import { FilterInventory } from './FilterInventory';
import { AIR_SERVICES } from '@/constants';

export const useInventory = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const theme: any = useTheme();
  const router = useRouter();
  const { push } = useRouter();
  const handleAddInventory = () => {
    push(AIR_SERVICES?.ADD_INVENTORY);
  };
  const inventoryListsColumns = inventoryListsColumnsFunction(
    inventoryData,
    setInventoryData,
    data,
    theme,
    router,
  );

  const renderComponent: any = {
    filter: (
      <FilterInventory
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    ),
    customize: (
      <CustomizeInventory
        isCustomizeModalOpen={isDrawerOpen}
        handleClose={() => {
          setIsDrawerOpen(false);
        }}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        columns={inventoryListsColumns?.slice(1)}
      />
    ),
  };
  const openDrawer = (tableActionQuery: any) => {
    router.push({
      pathname: router.pathname,
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
