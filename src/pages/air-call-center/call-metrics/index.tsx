import React from 'react';
import Layout from '@/layout';
import CallMetrics from '@/modules/airCallCenter/CallMetrics';

const AirCallCenterCallMetricsPage = () => {
  return <CallMetrics />;
};

export default AirCallCenterCallMetricsPage;

AirCallCenterCallMetricsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
