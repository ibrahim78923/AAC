import Layout from '@/layout';
import { Dashboard } from '@/modules/airOperations/Dashboard';
import React from 'react';

const AirOperationsDashboard = () => {
  return <Dashboard />;
};

export default AirOperationsDashboard;

AirOperationsDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
