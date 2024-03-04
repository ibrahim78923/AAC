import { useGetPurchaseOrderOverviewQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/overview';
import { useTheme } from '@mui/material';
import jsPDF from 'jspdf';
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
  const orderStatus = data?.data?.status;

  const handleDownload = () => {
    const invoice: any = new jsPDF('portrait', 'px', 'a1');
    invoice.html(document.getElementById('invoice')).then(() => {
      invoice.save('invoice.pdf');
    });
  };

  return {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
    purchaseOrderData,
    purchaseOrderDetailData,
    orderStatus,
    handleDownload,
  };
};
