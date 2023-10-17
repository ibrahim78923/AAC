import Layout from '@/layout';
import React from 'react';

const AirMarketerDashboard = () => {
  return <div>AirMarketerDashboard</div>;
};

export default AirMarketerDashboard;

AirMarketerDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
