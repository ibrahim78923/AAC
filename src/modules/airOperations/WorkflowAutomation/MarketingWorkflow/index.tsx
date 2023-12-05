import { PageTitledHeader } from '@/components/PageTitledHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { useMarketingWorkflow } from './useMarketingWorkflow';
import { marketingWorkflowListsData } from './MarketingWorkflow.data';
import { MarketingWorkflowSubHeader } from './MarketingWorkflowSubHeader';

export const MarketingWorkflow: any = () => {
  const {
    selectedMarketingWorkflowLists,
    marketingWorkflowListsColumn,
    search,
    setSearch,
    marketingWorkflowActionDropdown,
  } = useMarketingWorkflow();
  return (
    <>
      <PageTitledHeader
        title={'Marketing Workflow'}
        addTitle={'Create Workflow'}
      />
      <br />
      <MarketingWorkflowSubHeader
        disabledActionButton={!!!selectedMarketingWorkflowLists?.length}
        search={search}
        setSearch={setSearch}
        salesWorkflowActionDropdown={marketingWorkflowActionDropdown}
      />
      <br />
      <TanstackTable
        columns={marketingWorkflowListsColumn}
        data={marketingWorkflowListsData}
        isPagination
      />
    </>
  );
};
