import React from 'react';
import Layout from '@/layout';
import SingleAllCallsDetails from '@/modules/airCallCenter/CallMetrics/tabsComponents/allCalls/singleAllCallsDetails';

const AirCallCenterCallMetricsPage = () => {
  return <SingleAllCallsDetails />;
};

export default AirCallCenterCallMetricsPage;

AirCallCenterCallMetricsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
