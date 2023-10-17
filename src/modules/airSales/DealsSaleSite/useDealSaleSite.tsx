import { useState } from 'react';

const useDealSaleSite = () => {
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState('actions');

  const handleActions = (e: any) => {
    setActions(e.target.value);
  };

  return {
    search,
    setSearch,
    actions,
    setActions,
    handleActions,
  };
};

export default useDealSaleSite;
