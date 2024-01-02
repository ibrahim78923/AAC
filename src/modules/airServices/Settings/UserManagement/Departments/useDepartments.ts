import { useState } from 'react';

export const useDepartments = () => {
  const [searchBy, setSearchBy] = useState('');
  return {
    searchBy,
    setSearchBy,
  };
};
