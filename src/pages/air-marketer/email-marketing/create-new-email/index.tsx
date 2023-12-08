import React from 'react';
import Layout from '@/layout';
import CreateNewEmail from '@/modules/airMarketer/EmailMarketing/CreateNewEmail';

const AirMarketerDocumentPage = () => {
  return <CreateNewEmail />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
