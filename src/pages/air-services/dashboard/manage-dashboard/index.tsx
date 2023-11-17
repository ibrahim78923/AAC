import Layout from '@/layout';
import { ManageDashboard } from '@/modules/airServices/Dashboard/ManageDashboard';
import React from 'react';

const AirServicesManageDashboard = () => {
  return <ManageDashboard />;
};

export default AirServicesManageDashboard;

AirServicesManageDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
