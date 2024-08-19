import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ModuleForms from '@/modules/orgAdmin/properties/ModuleForms';

const ModuleFormsPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      <ModuleForms />
    </Layout>
  );
};

export default ModuleFormsPage;
