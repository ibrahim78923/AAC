import React from 'react';
import Layout from '@/layout';
import SingleAllCallsDetails from '@/modules/airCallCenter/CallMetrics/tabsComponents/allCalls/singleAllCallsDetails';
import { Permissions } from '@/constants/permissions';

const AirCallCenterCallMetricsPage = () => {
  return <SingleAllCallsDetails />;
};

export default AirCallCenterCallMetricsPage;

AirCallCenterCallMetricsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CALL_CENTER_CALL_METRICS}>
      {page}
    </Layout>
  );
};
