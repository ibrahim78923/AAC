import React from 'react';
import Layout from '@/layout';
import MyDocuments from '@/modules/SocialComponents/MyDocuments';

const AirMarketerDocumentPage = () => {
  return <MyDocuments />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
