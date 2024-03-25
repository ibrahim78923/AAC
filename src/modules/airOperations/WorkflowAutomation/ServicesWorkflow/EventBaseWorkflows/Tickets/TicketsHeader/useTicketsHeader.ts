import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../Tickets.data';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';
import { ACTIONS_TYPES } from '@/constants/strings';

export const useTicketsHeader = () => {
  const router = useRouter();
  const [deleteWorkflow, setDeleteWorkflow] = useState(false);
  const EDIT_WORKFLOW = 'edit';

  const handleActionClick = (actionType: string) => {
    if (actionType === ACTIONS_TYPES?.DELETE) {
      setDeleteWorkflow(true);
    } else if (actionType === ACTIONS_TYPES?.EDIT) {
      router?.push({
        pathname: AIR_OPERATIONS?.UPSERT_EVENT_BASED_WORKFLOW,
        query: {
          action: EDIT_WORKFLOW,
        },
      });
    }
  };
  const dropdownOptions = EventBaseWorkflowActionsDropdown(handleActionClick);
  return {
    dropdownOptions,
    router,
    setDeleteWorkflow,
    deleteWorkflow,
  };
};
