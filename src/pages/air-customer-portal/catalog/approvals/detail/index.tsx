import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

import { ApprovalDetail } from '@/modules/airCustomerPortal/Catalog/Approvals/ApprovalDetail';

import React from 'react';

const ApprovalDetailsPage = () => {
  return <ApprovalDetail />;
};
ApprovalDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_DASHBOARD}>
      {page}
    </Layout>
  );
};
export default ApprovalDetailsPage;
