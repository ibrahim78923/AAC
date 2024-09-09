import Layout from '@/layout';

import Approvals from '@/modules/airCustomerPortal/Catalog/Approvals';

import React from 'react';

const ApprovalPage = () => {
  return <Approvals />;
};
ApprovalPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};
export default ApprovalPage;
