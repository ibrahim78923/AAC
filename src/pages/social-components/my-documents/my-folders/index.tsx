import React from 'react';
import Layout from '@/layout';
import Folders from '@/modules/SocialComponents/MyDocuments/Folders';

const AirMarketerDocumentPage = () => {
  return <Folders />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
