import React from 'react';
import Layout from '@/layout';
import Documents from '@/modules/SocialComponents/MyDocuments/Documents';
import { Permissions } from '@/constants/permissions';

const AirMarketerDocumentPage = () => {
  return <Documents />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_DOCUMENTS}>
      {page}
    </Layout>
  );
};
