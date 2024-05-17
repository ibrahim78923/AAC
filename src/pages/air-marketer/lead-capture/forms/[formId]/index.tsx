import React from 'react';
import Layout from '@/layout';
import ViewDetails from '@/modules/airMarketer/LeadCapture/Forms/ViewDetails';
import { Permissions } from '@/constants/permissions';

const ViewDetailsPage = () => {
  return (
    <Layout
      guardRoute
      permissions={Permissions?.AIR_MARKETER_LEAD_CAPTURE_FORM}
    >
      <ViewDetails />
    </Layout>
  );
};

export default ViewDetailsPage;
