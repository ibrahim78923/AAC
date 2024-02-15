import Layout from '@/layout';
import Forms from '@/modules/airMarketer/LeadCapture/Forms';
import React from 'react';

const AirMarketerDashboard = () => {
  return <Forms />;
};

export default AirMarketerDashboard;

AirMarketerDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
