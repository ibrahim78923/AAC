import { useState } from 'react';

export const useTiers = () => {
  const [search, setSearch] = useState();
  return {
    search,
    setSearch,
  };
};
