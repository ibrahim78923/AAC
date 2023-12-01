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
import { EXPORT_FILE_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import {
  useLazyGetInventoryQuery,
  useLazyGetExportInventoryQuery,
} from '@/services/airServices/assets/inventory';
import { downloadFile } from '@/utils/file';
import usePath from '@/hooks/usePath';
import { DeleteInventory } from './DeleteInventory';
import { ImportInventory } from './ImportInventory';

export const useInventory = () => {
  const { makePath } = usePath();
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
    ([key, value]: any) => getInventoryParam?.append(key, value),
  );
  getInventoryParam?.append('page', page + '');
  getInventoryParam?.append('limit', pageLimit + '');
  getInventoryParam?.append('search', search);
  const getInventoryParameter = {
    queryParams: getInventoryParam,
  };

  const [lazyGetInventoryTrigger, lazyGetInventoryStatus] =
    useLazyGetInventoryQuery();

  const [lazyGetExportInventoryTrigger] = useLazyGetExportInventoryQuery();

  const getInventoryListData = async () => {
    try {
      const response = await lazyGetInventoryTrigger(
        getInventoryParameter,
      )?.unwrap();
      setSelectedInventoryLists([]);
      enqueueSnackbar(
        response?.message ?? ' inventory Retrieved successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const getInventoryListDataExport = async (type: any) => {
    const exportInventoryParams = new URLSearchParams();

    exportInventoryParams?.append('exportType', type);

    const getInventoryExportParameter = {
      queryParams: exportInventoryParams,
    };

    try {
      const response: any = await lazyGetExportInventoryTrigger(
        getInventoryExportParameter,
      )?.unwrap();
      downloadFile(response, 'InventoryLists', EXPORT_FILE_TYPE?.[type]);
      enqueueSnackbar(
        response?.data?.message ?? ' Inventory Exported successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? ' Inventory not exported', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  // useEffect(() => {
  //   getInventoryListData();
  // }, [search, page, pageLimit, inventoryFilterLists]);

  const handleAddInventory = () => {
    router?.push(AIR_SERVICES?.UPSERT_INVENTORY);
  };

  const inventoryListsColumnsPersist = inventoryListsColumnsFunction(
    selectedInventoryLists,
    setSelectedInventoryLists,
    lazyGetInventoryStatus?.data?.data?.result,
    router,
  );

  const inventoryActionComponent: any = {
    [INVENTORY_LIST_ACTIONS?.FILTER]: (
      <FilterInventory
        isDrawerOpen={hasInventoryAction}
        setIsDrawerOpen={setHasInventoryAction}
        setInventoryFilterLists={setInventoryFilterLists}
        inventoryFilterLists={inventoryFilterLists}
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
  };
};
