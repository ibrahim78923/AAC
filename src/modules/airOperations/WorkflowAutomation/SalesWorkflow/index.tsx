import { PageTitledHeader } from '@/components/PageTitledHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { useSalesWorkflow } from './useSalesWorkflow';
import { salesWorkflowListsData } from './SalesWorkflow.data';
import { SalesWorkflowSubHeader } from './SalesWorkflowSubHeader';
import { DeleteSalesWorkflow } from './DeleteSalesWorkflow';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';

export const SalesWorkflow = () => {
  const {
    selectedSalesWorkflowLists,
    salesWorkflowListsColumn,
    search,
    setSearch,
    salesWorkflowActionDropdown,
    handleBack,
    handleCreateWorkflow,
    deleteWorkflow,
    setDeleteWorkflow,
    isFilterOpen,
    setIsFilterOpen,
  } = useSalesWorkflow();
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
      <SalesWorkflowSubHeader
        disabledActionButton={!!!selectedSalesWorkflowLists?.length}
        search={search}
        setSearch={setSearch}
        salesWorkflowActionDropdown={salesWorkflowActionDropdown}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      <br />
      <TanstackTable
        columns={salesWorkflowListsColumn}
        data={salesWorkflowListsData}
        isPagination
      />
      <DeleteSalesWorkflow
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
      />
    </>
  );
};
