import React from 'react';
// ====================================================================================================
import Layout from '@/layout';

// un-comment this if want to use direct import
// import AddPlan from '@/modules/superAdmin/PlanManagement/AddPlan';
import dynamic from 'next/dynamic';

// Giving hydration error for wrapping the stepper with form provider
const AddPlanDynamic = dynamic(
  () => import('@/modules/superAdmin/PlanManagement/AddPlan'),
  {
    ssr: false,
  },
);

const AddPlanPage = () => {
  return <AddPlanDynamic />;
};

export default AddPlanPage;

AddPlanPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
