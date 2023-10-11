import React from 'react';
import Layout from '@/layout';

// import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';

import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { testComponentAssetsTabs } from '@/modules/airServices/Assets/PurchaseOrders/AssetsTab/AssetsTab.data';
// import UploadAttachments from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails/Attachments/UploadAttachment';
// import FileAttachment from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails/Attachments/FileAttachement';
import Attachments from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails/Attachments';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      {/* <FileAttachment /> */}
      {/* <SingleTicketDetail />; */}
      <HorizontalTabs tabsDataArray={testComponentAssetsTabs}>
        {/* <UploadAttachments /> */}
        <Attachments />
      </HorizontalTabs>
    </>
  );
};

//export default UseTicketViewDetailPage;
UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
