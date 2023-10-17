import { useState } from 'react';

const UseViewAll = () => {
  const [search, setSearch] = useState('');
  return {
    search,
    setSearch,
  };
};

export default UseViewAll;
