import { useState } from 'react';

export const useRules = () => {
  const [search, setSearch] = useState();
  return {
    search,
    setSearch,
  };
};
