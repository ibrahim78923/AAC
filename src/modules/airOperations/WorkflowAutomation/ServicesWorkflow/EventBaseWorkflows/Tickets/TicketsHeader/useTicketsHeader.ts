import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../Tickets.data';
import { useRouter } from 'next/router';

export const useTicketsHeader = () => {
  const router = useRouter();
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
    router,
  };
};
