import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  INVENTORY_LIST_ACTIONS,
  inventoryListsData,
  inventoryListsColumnsFunction,
  inventoryListsInitialColumns,
} from './Inventory.data';
import { CustomizeInventoryColumn } from './CustomizeInventoryColumn';
import { FilterInventory } from './FilterInventory';
import { AIR_SERVICES } from '@/constants';
import { PAGINATION } from '@/config';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import {
  useLazyGetInventoryQuery,
  useLazyGetExportInventoryQuery,
} from '@/services/airServices/assets/inventory';
import { downloadFile } from '@/utils/file';
import usePath from '@/hooks/usePath';
import { DeleteInventory } from './DeleteInventory';
import { ImportInventory } from './ImportInventory';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useInventory = () => {
  const { makePath } = usePath();
  const theme = useTheme();
  const [hasInventoryAction, setHasInventoryAction] = useState(false);
  const [selectedInventoryLists, setSelectedInventoryLists] = useState([]);
  const [inventoryListsColumns, setInventoryListsColumns] = useState(
    inventoryListsInitialColumns,
  );

  const [inventoryFilterLists, setInventoryFilterLists] = useState({});
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['inventoryListsAction'],
      }),
    );
  }, []);

  const getInventoryParam = new URLSearchParams();

  Object?.entries(inventoryFilterLists || {})?.forEach(
    ([key, value]: any) => getInventoryParam?.append(key, value?._id),
  );
  getInventoryParam?.append('page', page + '');
  getInventoryParam?.append('limit', pageLimit + '');
  getInventoryParam?.append('search', search);
  const getInventoryParameter = {
    queryParams: getInventoryParam,
  };

  const [lazyGetInventoryTrigger, lazyGetInventoryStatus] =
    useLazyGetInventoryQuery<any>();

  const [lazyGetExportInventoryTrigger] = useLazyGetExportInventoryQuery();

  const getInventoryListData = async () => {
    try {
      await lazyGetInventoryTrigger(getInventoryParameter)?.unwrap();
      setSelectedInventoryLists([]);
    } catch (error: any) {}
  };

  const getInventoryListDataExport = async (type: any) => {
    const exportInventoryParams = new URLSearchParams();

    exportInventoryParams?.append('exportType', type);
    exportInventoryParams?.append('page', page + '');
    exportInventoryParams?.append('limit', pageLimit + '');
    exportInventoryParams?.append('search', search);

    const getInventoryExportParameter = {
      queryParams: exportInventoryParams,
    };

    try {
      const response: any = await lazyGetExportInventoryTrigger(
        getInventoryExportParameter,
      )?.unwrap();
      downloadFile(response, 'InventoryLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File export successfully');
    } catch (error: any) {
      errorSnackbar();
    }
  };
  useEffect(() => {
    getInventoryListData();
  }, [search, page, pageLimit, inventoryFilterLists]);

  const handleAddInventory = () => {
    router?.push(AIR_SERVICES?.UPSERT_INVENTORY);
  };

  const inventoryListsColumnsPersist = inventoryListsColumnsFunction(
    selectedInventoryLists,
    setSelectedInventoryLists,
    lazyGetInventoryStatus?.data?.data?.inventories,
    router,
  );

  const inventoryActionComponent: any = {
    [INVENTORY_LIST_ACTIONS?.FILTER]: (
      <FilterInventory
        isDrawerOpen={hasInventoryAction}
        setIsDrawerOpen={setHasInventoryAction}
        setInventoryFilterLists={setInventoryFilterLists}
        inventoryFilterLists={inventoryFilterLists}
        setPage={setPage}
      />
    ),
    [INVENTORY_LIST_ACTIONS?.CUSTOMIZE_COLUMN]: (
      <CustomizeInventoryColumn
        isCustomizeModalOpen={hasInventoryAction}
        setIsDrawerOpen={setHasInventoryAction}
        inventoryListsColumns={inventoryListsColumns}
        setInventoryListsColumns={setInventoryListsColumns}
        setSelectedInventoryLists={setSelectedInventoryLists}
        inventoryListsColumnsPersist={inventoryListsColumnsPersist}
      />
    ),
    [INVENTORY_LIST_ACTIONS?.DELETE]: (
      <DeleteInventory
        deleteModalOpen={hasInventoryAction}
        setDeleteModalOpen={setHasInventoryAction}
        selectedInventoryLists={selectedInventoryLists}
        setSelectedInventoryLists={setSelectedInventoryLists}
        setPage={setPage}
      />
    ),
    [INVENTORY_LIST_ACTIONS?.IMPORT]: (
      <ImportInventory
        isDrawerOpen={hasInventoryAction}
        setIsDrawerOpen={setHasInventoryAction}
      />
    ),
  };
  const setInventoryAction = (inventoryListsActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        inventoryListsAction: inventoryListsActionQuery,
      },
    });
    setTimeout(() => {
      setHasInventoryAction(true);
    }, 100);
  };
  return {
    handleAddInventory,
    router,
    hasInventoryAction,
    setHasInventoryAction,
    setInventoryAction,
    inventoryActionComponent,
    inventoryListsColumns,
    inventoryListsData,
    selectedInventoryLists,
    setSelectedInventoryLists,
    getInventoryListDataExport,
    lazyGetInventoryStatus,
    setPage,
    setPageLimit,
    search,
    setSearch,
    inventoryListsColumnsPersist,
    getInventoryListData,
    theme,
  };
};
