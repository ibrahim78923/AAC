import { useState } from 'react';
import {
  salesWorkflowActionDropdownDynamic,
  salesWorkflowListsColumnDynamic,
} from './SalesWorkflow.data';

export const useSalesWorkflow = () => {
  const [selectedSalesWorkflowLists, setSelectedSalesWorkflowLists] = useState(
    [],
  );
  const [search, setSearch] = useState('');
  const salesWorkflowListsColumn = salesWorkflowListsColumnDynamic(
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
  );
  const salesWorkflowActionDropdown = salesWorkflowActionDropdownDynamic(
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
  );
  return {
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
    salesWorkflowListsColumn,
    search,
    setSearch,
    salesWorkflowActionDropdown,
  };
};
