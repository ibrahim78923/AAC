import React from 'react';
import Layout from '@/layout';
import EmailReports from '@/modules/airMarketer/EmailMarketing/EmailReports';
import { Permissions } from '@/constants/permissions';

const AirMarketerDocumentPage = () => {
  return <EmailReports />;
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
