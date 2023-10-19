import Layout from '@/layout';

import { PurchaseOrderEdit } from '@/modules/airServices/Assets/PurchaseOrders/SinglePurchaseOrderDetails/components/Header/PurchaseOrderEdit/PurchaseOrderEdit';

import React from 'react';

const index = () => {
  return (
    <>
      <PurchaseOrderEdit />
    </>
  );
};

// export default index;
index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default index;
