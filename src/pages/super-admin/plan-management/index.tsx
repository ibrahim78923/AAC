import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import PlanManagement from '@/modules/superAdmin/PlanManagement';
import store from '@/redux/store';

const SuperAdminPlanManagementPage = () => {
  return <PlanManagement />;
};

export default SuperAdminPlanManagementPage;

SuperAdminPlanManagementPage.getLayout = function getLayout(page: any) {
  const persistor = persistStore(store);
  return (
    <Layout permissions={Permissions.PLAN_MANAGEMENT}>
      {' '}
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        {page}{' '}
      </PersistGate>
    </Layout>
  );
};
