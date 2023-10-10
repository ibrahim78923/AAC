import Layout from '@/layout';
import DealsViewDetails from '@/modules/airSales/Deals/ViewDetails';
import React from 'react';

const DealsPage = () => {
  return <DealsViewDetails />;
};

export default DealsPage;

DealsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
