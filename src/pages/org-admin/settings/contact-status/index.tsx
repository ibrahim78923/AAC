import React from 'react';
import SuperAdminLayout from '../../../../layout';
import ContactStatus from '@/modules/orgAdmin/Settings/ContactStatus';
import { Permissions } from '@/constants/permissions';

const ContactStatusPage = () => {
  return <ContactStatus />;
};
export default ContactStatusPage;
ContactStatusPage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout
      permissions={Permissions?.ORG_ADMIN_SETTINGS_CONTACT_STATUS_PERMISSIONS}
    >
      {page}
    </SuperAdminLayout>
  );
};
