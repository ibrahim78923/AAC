import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleDashboardDetails } from '@/modules/airServices/Dashboard/SingleDashboardDetails';
import React from 'react';

const AirServicesSingleDashboard = () => {
  return <SingleDashboardDetails />;
};

export default AirServicesSingleDashboard;

AirServicesSingleDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_MANAGE_DASHBOARD}>
      {page}
    </Layout>
  );
};
