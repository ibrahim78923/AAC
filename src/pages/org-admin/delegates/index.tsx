import React from 'react';

import SuperAdminLayout from '../../../layout';

import Delegates from '@/modules/orgAdmin/Delegates';

const DelegatesPage = () => {
  return <Delegates />;
};
export default DelegatesPage;
DelegatesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
