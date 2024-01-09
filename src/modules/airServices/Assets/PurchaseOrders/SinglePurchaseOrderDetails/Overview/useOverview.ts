import { useGetPurchaseOrderOverviewQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/overview';
import { useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const useOverview = () => {
  const [openOverviewModal, setOpenOverviewModal] = useState(false);
  const theme = useTheme();
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams?.get('purchaseOrderId');
  const { data } = useGetPurchaseOrderOverviewQuery(purchaseOrderId);
  const purchaseOrderData = data?.data;

  const purchaseOrderDetailData = data?.data?.purchaseDetails;

  return {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
    purchaseOrderData,
    purchaseOrderDetailData,
  };
};
