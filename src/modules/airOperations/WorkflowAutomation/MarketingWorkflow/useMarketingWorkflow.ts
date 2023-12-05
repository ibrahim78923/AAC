import { useState } from 'react';
import {
  marketingWorkflowActionDropdownDynamic,
  marketingWorkflowListsColumnDynamic,
} from './MarketingWorkflow.data';

export const useMarketingWorkflow = () => {
  const [selectedMarketingWorkflowLists, setSelectedMarketingWorkflowLists] =
    useState([]);
  const [search, setSearch] = useState('');
  const marketingWorkflowListsColumn = marketingWorkflowListsColumnDynamic(
    selectedMarketingWorkflowLists,
    setSelectedMarketingWorkflowLists,
  );
  const marketingWorkflowActionDropdown =
    marketingWorkflowActionDropdownDynamic(
      selectedMarketingWorkflowLists,
      setSelectedMarketingWorkflowLists,
    );
  return {
    selectedMarketingWorkflowLists,
    setSelectedMarketingWorkflowLists,
    marketingWorkflowListsColumn,
    search,
    setSearch,
    marketingWorkflowActionDropdown,
  };
};
