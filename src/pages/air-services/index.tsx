import Layout from '@/layout';
import React from 'react';
import Dashboard from '@/modules/airServices/Dashboard';
import { Permissions } from '@/constants/permissions';

const AirServicesDashboard = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_VIEW_DASHBOARD}>
      {page}
    </Layout>
  );
};
