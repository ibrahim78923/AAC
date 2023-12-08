import React from 'react';
import Layout from '@/layout';
import EmailReports from '@/modules/airMarketer/EmailMarketing/EmailReports';

const AirMarketerDocumentPage = () => {
  return <EmailReports />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
