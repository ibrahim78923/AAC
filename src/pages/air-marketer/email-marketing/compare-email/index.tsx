import React from 'react';
import Layout from '@/layout';

import CompareEmails from '@/modules/airMarketer/EmailMarketing/CompareEmails';

const CompareEmailPage = () => {
  return <CompareEmails />;
};

export default CompareEmailPage;

CompareEmailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
