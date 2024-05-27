import React from 'react';
import Layout from '@/layout';
import Restore from '@/modules/airMarketer/LeadCapture/Forms/Restore';
import { Permissions } from '@/constants/permissions';

const RestorePage = () => {
  return (
    <Layout
      guardRoute
      permissions={Permissions?.AIR_MARKETER_LEAD_CAPTURE_FORM}
    >
      <Restore />
    </Layout>
  );
};

export default RestorePage;
