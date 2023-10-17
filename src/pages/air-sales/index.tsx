import Layout from '@/layout';
import React from 'react';

const AirSalesDashboard = () => {
  return <div>AirSalesDashboard</div>;
};

export default AirSalesDashboard;

AirSalesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
