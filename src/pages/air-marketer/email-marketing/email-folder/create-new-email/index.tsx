import React from 'react';
import Layout from '@/layout';
import CreateNewEmail from '@/modules/airMarketer/EmailMarketing/CreateNewEmail';
import { Permissions } from '@/constants/permissions';

const AirMarketerDocumentPage = () => {
  return <CreateNewEmail />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={
        Permissions.AIR_MARKETER_EMAIL_MARKETING_EMAIL_REPORTS_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
