import { PageTitledHeader } from '@/components/PageTitledHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { useSalesWorkflow } from './useSalesWorkflow';
import { salesWorkflowListsData } from './SalesWorkflow.data';
import { SalesWorkflowSubHeader } from './SalesWorkflowSubHeader';

export const SalesWorkflow = () => {
  const {
    selectedSalesWorkflowLists,
    salesWorkflowListsColumn,
    search,
    setSearch,
    salesWorkflowActionDropdown,
    handleBack,
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
    </>
  );
};
