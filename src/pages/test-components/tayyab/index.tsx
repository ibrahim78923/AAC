import React from 'react';
import Layout from '@/layout';
// import { SinglePurchaseOrderDetail } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails';
// import { SingleSoftwareDetailTabs } from '@/modules/airServices/Assets/Software/SingleSoftwareDetail/components/SingleSoftwareDetailTabs';
// import { SingleSoftwareDetail } from '@/modules/airServices/Assets/Software/SingleSoftwareDetail';
// import Contracts from '@/modules/airServices/Assets/Contracts';
import { SingleContractDetails } from '@/modules/airServices/Assets/Contracts/SingleContractDetails';
// import PurchaseOrder from '@/modules/airServices/Assets/PurchaseOrders';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      {/* <SinglePurchaseOrderDetail /> */}
      {/* <SingleSoftwareDetail /> */}
      {/* <PurchaseOrder /> */}
      {/* <Contracts /> */}
      <SingleContractDetails />
    </>
  );
};

UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
