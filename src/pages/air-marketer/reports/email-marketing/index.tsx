import Layout from '@/layout';
import EmailMarketing from '@/modules/airMarketer/Reports/EmailMarketing';
import React from 'react';
import { Permissions } from '@/constants/permissions';

const EmailMarketingPage = () => {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_REPORTS}>
      <EmailMarketing />
    </Layout>
  );
};

export default EmailMarketingPage;
