import Layout from '@/layout';
import MyDocuments from '@/modules/airMarketer/MyDocuments';
import React from 'react';

const AirMarketerDashboard = () => {
  return <MyDocuments />;
};

export default AirMarketerDashboard;

AirMarketerDashboard.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
