import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../SupervisorRules.data';

export const useHeader = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleActionClick = () => {};
  const dropdownOptions = EventBaseWorkflowActionsDropdown(handleActionClick);
  return {
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
  };
};
