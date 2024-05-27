import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import PageNotFound from '@/components/pageNotFound';

const PropertiesPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_PROPERTIES}>
      <PageNotFound />
    </Layout>
  );
};

export default PropertiesPage;
