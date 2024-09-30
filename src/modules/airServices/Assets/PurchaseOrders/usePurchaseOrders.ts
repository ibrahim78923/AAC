import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIR_SERVICES } from '@/constants';
import { PAGINATION } from '@/config';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import {
  useLazyGetAirServicesAssetsExportPurchaseOrderListQuery,
  useLazyGetAirServicesAssetsPurchaseOrderListQuery,
} from '@/services/airServices/assets/purchase-orders';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { purchaseOrderColumnsFunction } from './PurchaseOrders.data';
import { useTheme } from '@mui/material';

const { NEW_PURCHASE_ORDER } = AIR_SERVICES;

const usePurchaseOrders = () => {
  const router = useRouter();
  const theme = useTheme();
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
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

  const purchaseOrderColumns = purchaseOrderColumnsFunction(
    purchaseOrderData,
    setPurchaseOrderData,
    lazyGetPurchaseOrderListStatus?.data?.data?.purchases,
    router,
  );

  const onDeleteClick = () => {
    if (purchaseOrderData?.length > 1) {
      errorSnackbar('Please select only 1');
      return;
    }
    setDeleteModalOpen?.(true);
  };

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
    setSearchValue,
    lazyGetPurchaseOrderListStatus,
    purchaseOrderColumns,
    getPurchaseOrderListDataExport,
    purchaseOrderFilter,
    setPurchaseOrderFilter,
    getPurchaseOrderListData,
    onDeleteClick,
    theme,
  };
};
export default usePurchaseOrders;
