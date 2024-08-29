import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ContactViewDetails from '@/modules/airSocial/Contacts/ViewDetails';
import React from 'react';

const ViewDetailsPage = () => {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      <ContactViewDetails />
    </Layout>
  );
};

export default ViewDetailsPage;
