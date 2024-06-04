import { useState } from 'react';

export const useVoiceMail = () => {
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return {
    search,
    setSearch,
    isDrawerOpen,
    setIsDrawerOpen,
  };
};
