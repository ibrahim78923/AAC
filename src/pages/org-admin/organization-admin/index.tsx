import React from 'react';

import Organization from '@/modules/orgAdmin/Organization';
import SuperAdminLayout from '../../../layout';
import { Permissions } from '@/constants/permissions';
const OrganizationPage = () => {
  return <Organization />;
};
export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_ORGANIZATION}
    >
      {page}
    </SuperAdminLayout>
  );
};
