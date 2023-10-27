import Layout from '@/layout';
import React from 'react';

const AirServicesDashboard = () => {
  return <div>dashboard</div>;
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
