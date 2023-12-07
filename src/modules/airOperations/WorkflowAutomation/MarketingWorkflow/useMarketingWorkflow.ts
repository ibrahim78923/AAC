import { useState } from 'react';
import {
  marketingWorkflowActionDropdownDynamic,
  marketingWorkflowListsColumnDynamic,
} from './MarketingWorkflow.data';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useMarketingWorkflow = () => {
  const [selectedMarketingWorkflowLists, setSelectedMarketingWorkflowLists] =
    useState([]);
  const [search, setSearch] = useState('');
  const marketingWorkflowListsColumn = marketingWorkflowListsColumnDynamic(
    selectedMarketingWorkflowLists,
    setSelectedMarketingWorkflowLists,
  );
  const marketingWorkflowActionDropdown =
    marketingWorkflowActionDropdownDynamic(selectedMarketingWorkflowLists);
  const { push } = useRouter();
  const handleBack = () => {
    push(AIR_OPERATIONS?.WORKFLOW_AUTOMATION);
  };
  const handleCreateWorkflow = () => {
    push(AIR_OPERATIONS?.UPSERT_MARKETING_WORKFLOW);
  };
  return {
    selectedMarketingWorkflowLists,
    setSelectedMarketingWorkflowLists,
    marketingWorkflowListsColumn,
    search,
    setSearch,
    marketingWorkflowActionDropdown,
    handleBack,
    handleCreateWorkflow,
  };
};
