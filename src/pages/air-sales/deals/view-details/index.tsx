import Layout from '@/layout';
import DealsViewDetails from '@/modules/airSales/Deals/ViewDetails';
import React from 'react';

const ViewDetailsPage = () => {
  return <DealsViewDetails />;
};
export default ViewDetailsPage;

ViewDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
