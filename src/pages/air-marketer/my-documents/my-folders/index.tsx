import React from 'react';
import Layout from '@/layout';
import Folders from '@/modules/SocialComponents/MyDocuments/Folders';
import { Permissions } from '@/constants/permissions';

const AirMarketerDocumentPage = () => {
  return <Folders />;
};

export default AirMarketerDocumentPage;

AirMarketerDocumentPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions?.SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER}
    >
      {page}
    </Layout>
  );
};
