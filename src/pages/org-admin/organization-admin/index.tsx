import React from 'react';

import Organization from '@/modules/orgAdmin/Organization';
import SuperAdminLayout from '../../../layout';
const OrganizationPage = () => {
  return <Organization />;
};
export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
