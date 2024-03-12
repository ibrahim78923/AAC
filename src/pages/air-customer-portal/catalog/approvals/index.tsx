import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import Approvals from '@/modules/airCustomerPortal/Catalog/Approvals';

import React from 'react';

const ApprovalPage = () => {
  return <Approvals />;
};
ApprovalPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_DASHBOARD}>
      {page}
    </Layout>
  );
};
export default ApprovalPage;
