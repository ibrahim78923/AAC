import React from 'react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import ChoosePlan from '@/modules/ChoosePlan';

const ChoosePlanPage = () => {
  return <ChoosePlan />;
};
export default ChoosePlanPage;
ChoosePlanPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
