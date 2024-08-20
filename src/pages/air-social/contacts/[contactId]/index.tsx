import Layout from '@/layout';
import ContactViewDetails from '@/modules/airSocial/Contacts/ViewDetails';
import React from 'react';

const ViewDetailsPage = () => {
  return (
    // Remove permissions guard for common components
    // permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}
    <Layout guardRoute variant="common">
      <ContactViewDetails />
    </Layout>
  );
};

export default ViewDetailsPage;
