import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../Assets.data';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { ACTIONS_TYPES } from '@/constants/strings';

export const useAssetsHeader = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);

  const handleActionClick = (actionType: string) => {
    if (actionType === ACTIONS_TYPES?.DELETE) {
      setDeleteWorkflow(true);
    } else if (actionType === ACTIONS_TYPES?.EDIT) {
      router?.push(AIR_OPERATIONS?.UPSERT_EVENT_BASED_WORKFLOW);
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
