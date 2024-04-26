import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Dashboard from '@/modules/orgAdmin/Dashboard';
import React from 'react';

const DashboardPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
