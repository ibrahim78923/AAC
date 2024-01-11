import { useGetPurchaseOrderOverviewQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/overview';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useOverview = () => {
  const [openOverviewModal, setOpenOverviewModal] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const purchaseOrderId = router?.query?.purchaseOrderId;
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
