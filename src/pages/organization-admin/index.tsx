import Organization from '@/modules/Organization';
import React from 'react';

import SuperAdminLayout from '../../layout';
const OrganizationPage = () => {
  return <Organization />;
};
export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
