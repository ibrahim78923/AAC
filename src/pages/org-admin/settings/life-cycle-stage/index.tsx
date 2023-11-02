import React from 'react';
import SuperAdminLayout from '../../../../layout';
import LifeCycleStage from '@/modules/orgAdmin/Settings/LifeCycleStage';

const LifeCycleStagePage = () => {
  return <LifeCycleStage />;
};
export default LifeCycleStagePage;
LifeCycleStagePage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
