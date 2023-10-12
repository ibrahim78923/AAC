import React from 'react';
import Layout from '@/layout';
import { SinglePurchaseOrderDetailTabs } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails/components/SinglePurchaseOrderDetailTabs';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      <SinglePurchaseOrderDetailTabs />
    </>
  );
};

UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
