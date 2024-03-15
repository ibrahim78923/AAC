import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSalesWorkflow } from './useSalesWorkflow';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Deal } from './SalesListView/Deal';
import { Quote } from './SalesListView/Quote';
import { Meeting } from './SalesListView/Meeting';
import { Task } from './SalesListView/Task';

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
      <HorizontalTabs tabsDataArray={['Deals', 'Quotes', 'Meeting', 'Tasks']}>
        <Deal />
        <Quote />
        <Meeting />
        <Task />
      </HorizontalTabs>
    </>
  );
};
