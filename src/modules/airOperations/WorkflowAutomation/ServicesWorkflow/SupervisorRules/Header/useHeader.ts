import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../SupervisorRules.data';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useHeader = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);

  const handleActionClick = (actionType: string) => {
    if (actionType === 'delete') {
      setDeleteWorkflow(true);
    } else if (actionType === 'edit') {
      router.push(AIR_OPERATIONS?.UPSERT_SUPERVISOR_RULES);
    }
  };
  const dropdownOptions = EventBaseWorkflowActionsDropdown(handleActionClick);
  return {
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    router,
    deleteWorkflow,
    setDeleteWorkflow,
  };
};
