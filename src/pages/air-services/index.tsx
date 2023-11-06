import Layout from '@/layout';
import React from 'react';
import Dashboard from '@/modules/airServices/Dashboard';

const AirServicesDashboard = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
