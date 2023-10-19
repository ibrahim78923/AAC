import { useState } from 'react';

const useRestore = () => {
  const [isRestoreFilter, setIsRestoreFilter] = useState(false);

  const handleRestoreFilter = () => {
    setIsRestoreFilter(!isRestoreFilter);
  };
  return {
    isRestoreFilter,
    handleRestoreFilter,
  };
};

export default useRestore;
