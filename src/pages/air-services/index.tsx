import Layout from '@/layout';
import React from 'react';

const AirServicesDashboard = () => {
  return <div>AirServicesDashboard</div>;
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
