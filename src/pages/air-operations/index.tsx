import Layout from '@/layout';
import React from 'react';

const AirOperationsDashboard = () => {
  return <div>AirOperationsDashboard</div>;
};

export default AirOperationsDashboard;

AirOperationsDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
