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
  const { push } = useRouter();
  const salesWorkflowActionDropdown = salesWorkflowActionDropdownDynamic(
    selectedSalesWorkflowLists,
    setDeleteWorkflow,
    push,
  );
  const handleBack = () => {
    push({
      pathname: AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
    });
  };
  const handleCreateWorkflow = () => {
    push(AIR_OPERATIONS?.UPSERT_SALES_WORKFLOW);
  };
  return {
    selectedSalesWorkflowLists,
    setSelectedSalesWorkflowLists,
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
  };
};
