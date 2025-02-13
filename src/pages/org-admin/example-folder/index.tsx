import Layout from '@/layout';
import React from 'react';

const OrganizationAdminExamplePage = () => {
  return <div>Organisation Admin Example Page</div>;
};

export default OrganizationAdminExamplePage;

OrganizationAdminExamplePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
