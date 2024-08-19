import React from 'react';
import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import DynamicForm from '@/modules/orgAdmin/properties/DynamicForm';

const DynamicFormPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      <DynamicForm />
    </Layout>
  );
};

export default DynamicFormPage;
