import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIR_SERVICES } from '@/constants/routes';
import { PAGINATION } from '@/config';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import {
  useLazyGetAirServicesAssetsExportPurchaseOrderListQuery,
  useLazyGetAirServicesAssetsPurchaseOrderListQuery,
} from '@/services/airServices/assets/purchase-orders';
import { buildQueryParams } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { purchaseOrderColumnsFunction } from './PurchaseOrders.data';
import { useTheme } from '@mui/material';

const { NEW_PURCHASE_ORDER } = AIR_SERVICES;

const usePurchaseOrders = () => {
  const router = useRouter();
  const theme = useTheme();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useState({});

  const handleNewPurchaseOrder = () => {
    router?.push(NEW_PURCHASE_ORDER);
  };

  const [lazyGetPurchaseOrderListTrigger, lazyGetPurchaseOrderListStatus] =
    useLazyGetAirServicesAssetsPurchaseOrderListQuery<any>();

  const [lazyGetExportPurchaseOrderListTrigger] =
    useLazyGetAirServicesAssetsExportPurchaseOrderListQuery();

  const getPurchaseOrderListData = async (currentPage: any = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', searchValue],
    ];
    const getPurchaseOrderListParam: any = buildQueryParams(
      additionalParams,
      purchaseOrderFilter,
    );

    const getPurchaseOrderListParameter = {
      queryParams: getPurchaseOrderListParam,
    };

    try {
      await lazyGetPurchaseOrderListTrigger(
        getPurchaseOrderListParameter,
      )?.unwrap();
      setPurchaseOrderData([]);
    } catch (error: any) {}
  };

  const getPurchaseOrderListDataExport = async (type: any) => {
    const queryParams = {
      exportType: type,
      meta: false,
    };

    const apiDataParameter = {
      queryParams,
    };

    try {
      const response: any =
        await lazyGetExportPurchaseOrderListTrigger(apiDataParameter)?.unwrap();
      downloadFile(response, 'Purchase Order List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File export successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    getPurchaseOrderListData();
  }, [searchValue, page, pageLimit, purchaseOrderFilter]);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchValue(data);
  };

  const purchaseOrderColumns = purchaseOrderColumnsFunction(
    purchaseOrderData,
    setPurchaseOrderData,
    lazyGetPurchaseOrderListStatus?.data?.data?.purchases,
    router,
  );

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    router,
    deleteModalOpen,
    setDeleteModalOpen,
    purchaseOrderData,
    setPurchaseOrderData,
    setPage,
    setPageLimit,
    page,
    pageLimit,
    searchValue,
    handleSearch,
    lazyGetPurchaseOrderListStatus,
    purchaseOrderColumns,
    getPurchaseOrderListDataExport,
    purchaseOrderFilter,
    setPurchaseOrderFilter,
    getPurchaseOrderListData,
    theme,
  };
};
export default usePurchaseOrders;
