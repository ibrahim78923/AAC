import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ModuleForms from '@/modules/orgAdmin/properties/ModuleForms';

const ModuleFormsPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_PROPERTIES}>
      <ModuleForms />
    </Layout>
  );
};

export default ModuleFormsPage;
