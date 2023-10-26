import { useState } from 'react';

export const useTicketsListsSubHeader = () => {
  const [search, setSearch] = useState('');

  return {
    search,
    setSearch,
  };
};
