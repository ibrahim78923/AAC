import React from 'react';
import Layout from '@/layout';

const AirCallCenterCallMetricsPage = () => {
  return <h1>power dialer page</h1>;
};

export default AirCallCenterCallMetricsPage;

AirCallCenterCallMetricsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
