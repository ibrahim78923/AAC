import Layout from '@/layout';
import React from 'react';

const OrganizationAdminDashboard = () => {
  return <div>OrganizationAdmin Dashboard</div>;
};

export default OrganizationAdminDashboard;

OrganizationAdminDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
