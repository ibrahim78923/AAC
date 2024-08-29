import React from 'react';
import Layout from '@/layout';

import CompareEmails from '@/modules/airMarketer/EmailMarketing/CompareEmails';
import { Permissions } from '@/constants/permissions';

const CompareEmailPage = () => {
  return <CompareEmails />;
};

export default CompareEmailPage;

CompareEmailPage.getLayout = function getLayout(page: any) {
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
