import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  agentListData,
  agentsListsColumnsFunction,
  agentActionsDropdown,
} from './Agent.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAgent = () => {
  const [selectedAgentList, setSelectedAgentList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleActionClick = () => {
    if (selectedAgentList?.length > 1) {
      enqueueSnackbar(`Can't update multiple records`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      return;
    }
  };

  const agentListsColumns = agentsListsColumnsFunction(
    selectedAgentList,
    setSelectedAgentList,
    agentListData,
  );

  const dropdownOptions = agentActionsDropdown(handleActionClick);

  return {
    selectedAgentList,
    agentListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
  };
};
