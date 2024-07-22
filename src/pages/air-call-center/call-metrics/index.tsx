import React from 'react';
import Layout from '@/layout';
import CallMetrics from '@/modules/airCallCenter/CallMetrics';
import { Permissions } from '@/constants/permissions';

const AirCallCenterCallMetricsPage = () => {
  return <CallMetrics />;
};

export default AirCallCenterCallMetricsPage;

AirCallCenterCallMetricsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CALL_CENTER_CALL_METRICS}>
      {page}
    </Layout>
  );
};
