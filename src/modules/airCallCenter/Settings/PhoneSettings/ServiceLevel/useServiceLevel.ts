import { useState } from 'react';

export const useServiceLevel = () => {
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return {
    search,
    setSearch,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
