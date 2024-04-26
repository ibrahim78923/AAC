import { useState } from 'react';

export const useTestWorkflow = () => {
  const [searchBy, setSearchBy] = useState('');
  return {
    searchBy,
    setSearchBy,
  };
};
