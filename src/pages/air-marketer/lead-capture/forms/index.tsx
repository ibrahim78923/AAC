import Layout from '@/layout';
import Forms from '@/modules/airMarketer/LeadCapture/Forms';
import React from 'react';
import { Permissions } from '@/constants/permissions';

const AirMarketerDashboard = () => {
  return <Forms />;
};

export default AirMarketerDashboard;

AirMarketerDashboard.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_LEAD_CAPTURE_FORM}>
      {page}
    </Layout>
  );
};
