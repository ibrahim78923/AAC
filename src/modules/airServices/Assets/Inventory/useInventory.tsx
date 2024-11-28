import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  INVENTORY_LIST_ACTIONS,
  inventoryListsColumnsFunction,
  inventoryListsInitialColumns,
} from './Inventory.data';
import { CustomizeInventoryColumn } from './CustomizeInventoryColumn';
import { FilterInventory } from './FilterInventory';
import { AIR_SERVICES } from '@/constants/routes';
import { PAGINATION } from '@/config';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import {
  useLazyGetAirServicesAssetsInventoryQuery,
  useLazyGetAirServicesAssetsExportInventoryQuery,
} from '@/services/airServices/assets/inventory';
import { downloadFile } from '@/utils/file';
import usePath from '@/hooks/usePath';
import { DeleteInventory } from './DeleteInventory';
import { ImportInventory } from './ImportInventory';
import { useTheme } from '@mui/material';
import { buildQueryParams } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { getActiveAccountSession } from '@/utils';

export const useInventory = () => {
  const { makePath } = usePath();
  const theme = useTheme();

  const [hasInventoryAction, setHasInventoryAction] = useState(false);
  const [selectedInventoryLists, setSelectedInventoryLists] = useState<
    string[]
  >([]);
  const [inventoryListsColumns, setInventoryListsColumns] = useState(
    inventoryListsInitialColumns,
  );
  const [inventoryFilterLists, setInventoryFilterLists] = useState({});
  const [page, setPage] = useState<number>(PAGINATION.CURRENT_PAGE);
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

  const [lazyGetInventoryTrigger, lazyGetInventoryStatus] =
    useLazyGetAirServicesAssetsInventoryQuery<any>();

  const [lazyGetExportInventoryTrigger] =
    useLazyGetAirServicesAssetsExportInventoryQuery();

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyIdStorage = product?.company?._id;

  const getInventoryListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['companyId', companyIdStorage],
      ['meta', true + ''],
    ];
    const getInventoryParam: any = buildQueryParams(
      additionalParams,
      inventoryFilterLists,
    );

    const getInventoryParameter = {
      queryParams: getInventoryParam,
    };

    try {
      await lazyGetInventoryTrigger(getInventoryParameter)?.unwrap();
      setSelectedInventoryLists([]);
    } catch (error: any) {}
  };

  const getInventoryListDataExport = async (type: any) => {
    const queryParams = {
      exportType: type,
      meta: false,
    };

    const getInventoryParameter = {
      queryParams,
    };

    try {
      const response: any = await lazyGetExportInventoryTrigger(
        getInventoryParameter,
      )?.unwrap();
      downloadFile(response, 'Inventory List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File Exported Successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    getInventoryListData();
  }, [search, page, pageLimit, inventoryFilterLists]);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

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
        page={page}
        getInventoryListData={getInventoryListData}
        totalRecords={lazyGetInventoryStatus?.data?.data?.inventories?.length}
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
    selectedInventoryLists,
    setSelectedInventoryLists,
    getInventoryListDataExport,
    lazyGetInventoryStatus,
    setPage,
    setPageLimit,
    search,
    handleSearch,
    inventoryListsColumnsPersist,
    getInventoryListData,
    theme,
  };
};
