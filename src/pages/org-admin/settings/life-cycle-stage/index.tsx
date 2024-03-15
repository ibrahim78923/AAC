import React from 'react';
import SuperAdminLayout from '../../../../layout';
import LifeCycleStage from '@/modules/orgAdmin/Settings/LifeCycleStage';
import { Permissions } from '@/constants/permissions';

const LifeCycleStagePage = () => {
  return <LifeCycleStage />;
};
export default LifeCycleStagePage;
LifeCycleStagePage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SETTINGS_LIFECYCLE_STAGES}
    >
      {page}
    </SuperAdminLayout>
  );
};
