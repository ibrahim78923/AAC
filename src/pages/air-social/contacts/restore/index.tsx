import React from 'react';
import Layout from '@/layout';
import Restore from '@/modules/airSocial/Contacts/Restore';

const RestorePage = () => {
  return (
    // Remove permissions guard for common components
    // permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}
    <Layout guardRoute variant="common">
      <Restore />
    </Layout>
  );
};

export default RestorePage;
