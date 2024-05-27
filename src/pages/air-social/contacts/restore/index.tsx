import React from 'react';
import Layout from '@/layout';
import Restore from '@/modules/airSocial/Contacts/Restore';
import { Permissions } from '@/constants/permissions';

const RestorePage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      <Restore />
    </Layout>
  );
};

export default RestorePage;
