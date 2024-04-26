import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import {
  useLazyGetAssetsReceivedQuery,
  useGetPurchaseOrderByIdQuery,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/assets-received';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export const useAssetsReceivedDetail = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getParams = useSearchParams();
  const purchaseOrderId = getParams.get('purchaseOrderId');
  const assetReceivedParams = new URLSearchParams();
  assetReceivedParams.append('page', page?.toString());
  assetReceivedParams.append('limit', limit?.toString());
  assetReceivedParams.append('id', purchaseOrderId + '');
  const {
    data: purchaseOrderIdData,
    isLoading: purchaseLoading,
    isFetching: purchaseFetching,
  } = useGetPurchaseOrderByIdQuery(purchaseOrderId);
  const [
    getAssetsReceivedTrigger,
    { data, isError, isSuccess, isLoading, isFetching },
  ] = useLazyGetAssetsReceivedQuery();
  useEffect(() => {
    const handleAssetsReceived = async () => {
      await getAssetsReceivedTrigger(assetReceivedParams);
    };
    handleAssetsReceived();
  }, [getAssetsReceivedTrigger, assetReceivedParams?.toString()]);

  const assetsReceivedData = data?.data?.inventories;
  const assetsReceivedMeta = data?.data?.meta;
  const theme = useTheme();
  const MIN_META = 5;
  return {
    assetsReceivedData,
    assetsReceivedMeta,
    page,
    setPage,
    limit,
    setLimit,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    theme,
    MIN_META,
    purchaseOrderIdData,
    purchaseLoading,
    purchaseFetching,
  };
};
