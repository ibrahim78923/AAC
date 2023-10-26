import Layout from '@/layout';
import { CreateDashboard } from '@/modules/dashboard/CreateDashboard';
import React from 'react';

const AirServicesDashboard = () => {
  return (
    <div>
      <CreateDashboard />
    </div>
  );
};

export default AirServicesDashboard;

AirServicesDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
