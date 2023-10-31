import Layout from '@/layout';
import React from 'react';
import ServicesDashboard from '@/modules/airServices/ServicesDashboard';

const AirServicesDashboard = () => {
  return (
    <>
      <ServicesDashboard />
    </>
  );
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
