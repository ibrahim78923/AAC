import Layout from '@/layout';
import NewParchaseOrder from '@/modules/airServices/Assets/PurchaseOrders/NewParchaseOrder';
import React from 'react';

const index = () => {
  return (
    <>
      <NewParchaseOrder />
    </>
  );
};

index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default index;
