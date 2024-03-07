import { useGetPurchaseOrderOverviewQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/overview';
import { useTheme } from '@mui/material';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useOverview = () => {
  const [openOverviewModal, setOpenOverviewModal] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const purchaseOrderId = router?.query?.purchaseOrderId;
  const { data } = useGetPurchaseOrderOverviewQuery(purchaseOrderId);
  const purchaseOrderData = data?.data;
  const purchaseOrderDetailData = data?.data?.purchaseDetails;
  const productOrderDetailData = data?.data?.productDetails?.[0];
  const orderStatus = data?.data?.status;

  const handleDownload = () => {
    const invoice: any = new jsPDF('portrait', 'px', 'a1');
    invoice.html(document.getElementById('invoice')).then(() => {
      invoice.save('invoice.pdf');
    });
  };
  const [uniqueNumber, setUniqueNumber] = useState(1);
  const [generatedNumbers, setGeneratedNumbers] = useState<any>([]);
  let randomNumber: any;
  do {
    randomNumber = Math.floor(Math.random() * 10000);
  } while (generatedNumbers.includes(randomNumber));

  useEffect(() => {
    setGeneratedNumbers([...generatedNumbers, randomNumber]);
    setUniqueNumber(randomNumber);
  }, []);

  return {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
    purchaseOrderData,
    purchaseOrderDetailData,
    productOrderDetailData,
    orderStatus,
    handleDownload,
    uniqueNumber,
  };
};
