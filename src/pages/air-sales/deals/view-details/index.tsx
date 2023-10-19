import React from 'react';

import Layout from '@/layout';

import ViewDetails from '@/modules/airSales/Deals/ViewDetails';

const ViewDetailsPage = () => {
  return <ViewDetails />;
};
export default ViewDetailsPage;

ViewDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
