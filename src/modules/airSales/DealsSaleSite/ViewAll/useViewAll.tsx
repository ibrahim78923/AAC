import { useState } from 'react';

const useViewAll = () => {
  const [search, setSearch] = useState('');
  return {
    search,
    setSearch,
  };
};

export default useViewAll;
