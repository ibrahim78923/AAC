import React from 'react';
import SuperAdminLayout from '../../../../layout';
import ContactStatus from '@/modules/orgAdmin/Settings/ContactStatus';
const ContactStatusPage = () => {
  return <ContactStatus />;
};
export default ContactStatusPage;
ContactStatusPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
