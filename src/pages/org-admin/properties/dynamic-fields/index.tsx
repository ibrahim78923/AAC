import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import DynamicFields from '@/modules/orgAdmin/properties/DynamicFields';

const DynamicFieldsPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_PROPERTIES}>
      <DynamicFields />
    </Layout>
  );
};

export default DynamicFieldsPage;
