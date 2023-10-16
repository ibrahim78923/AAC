import React from 'react';
import Layout from '@/layout';
import { SinglePurchaseOrderDetail } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      <SinglePurchaseOrderDetail />
    </>
  );
};

UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
