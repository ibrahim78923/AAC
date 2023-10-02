import React from 'react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ManagePlan from '@/modules/ManagePlan';

const ManagePlanPage = () => {
  return <ManagePlan />;
};

export default ManagePlanPage;
ManagePlanPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
