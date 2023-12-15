import { useState } from 'react';
import { EventBaseWorkflowActionsDropdown } from '../Assets.data';
import { useRouter } from 'next/router';

export const useAssetsHeader = () => {
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
