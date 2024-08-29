import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSalesWorkflow } from './useSalesWorkflow';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Deal } from './SalesListView/Deal';
import { Quote } from './SalesListView/Quote';
import { Task } from './SalesListView/Task';
import { tabsData } from './SalesWorkflow.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

export const SalesWorkflow = () => {
  const { handleBack, handleCreateWorkflow } = useSalesWorkflow();
  return (
    <>
      <PageTitledHeader
        title={'Sales Workflow'}
        addTitle={'Create Workflow'}
        canMovedBack
        moveBack={handleBack}
        handleAction={handleCreateWorkflow}
        createPermissionKey={[
          AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.ADD_CONDITION,
        ]}
      />
      <br />
      <PermissionsGuard
        permissions={
          Permissions?.AIR_OPERATIONS_WORKFLOWS_LIST_VIEW_SALES_WORKFLOW
        }
      >
        <HorizontalTabs tabsDataArray={tabsData}>
          <Deal />
          <Quote />
          <Task />
        </HorizontalTabs>
      </PermissionsGuard>
    </>
  );
};
