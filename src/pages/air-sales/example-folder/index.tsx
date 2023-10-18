import Layout from '@/layout';
import React from 'react';

const AirSalesExamplePage = () => {
  return <div>AirSales Example Page</div>;
};

export default AirSalesExamplePage;

AirSalesExamplePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
