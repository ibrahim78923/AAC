import React from 'react';

import Delegates from '@/modules/orgAdmin/Delegates';
import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';

const DelegatesPage = () => {
  return <Delegates />;
};
export default DelegatesPage;
DelegatesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      {page}
    </Layout>
  );
};
