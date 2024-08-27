import React from 'react';
import Layout from '@/layout';
import MyDocuments from '@/modules/SocialComponents/MyDocuments';
import { Permissions } from '@/constants/permissions';

const AirMarketerDocumentPage = () => {
  return <MyDocuments />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_DOCUMENTS}>
      {page}
    </Layout>
  );
};
