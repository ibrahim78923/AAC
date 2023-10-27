import Layout from '@/layout';
import CreateDashboard from '@/modules/airSales/Dashboard/CreateDashboard';
import React from 'react';

const AirServicesCreateDashboard = () => {
  return <CreateDashboard />;
};

export default AirServicesCreateDashboard;

AirServicesCreateDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
