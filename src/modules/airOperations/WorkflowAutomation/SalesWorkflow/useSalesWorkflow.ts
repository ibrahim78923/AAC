import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import {
  salesWorkflowActionDropdownDynamic,
  salesWorkflowListsColumnDynamic,
} from './SalesWorkflow.data';

export const useSalesWorkflow = () => {
  const [selectedSalesWorkflowLists, setSelectedSalesWorkflowLists] = useState(
    [],
  );
  const [search, setSearch] = useState('');
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const salesWorkflowListsColumn = salesWorkflowListsColumnDynamic(
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
  );
  const salesWorkflowActionDropdown = salesWorkflowActionDropdownDynamic(
    selectedSalesWorkflowLists,
    setDeleteWorkflow,
  );
  const { push } = useRouter();
  const handleBack = () => {
    push({
      pathname: AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
    });
  };
  return {
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
    salesWorkflowListsColumn,
    search,
    setSearch,
    salesWorkflowActionDropdown,
    handleBack,
    deleteWorkflow,
    setDeleteWorkflow,
    isFilterOpen,
    setIsFilterOpen,
  };
};
