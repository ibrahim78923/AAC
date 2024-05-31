import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Properties from '@/modules/orgAdmin/properties';

const PropertiesPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_PROPERTIES}>
      <Properties />
    </Layout>
  );
};

export default PropertiesPage;
