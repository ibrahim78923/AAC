import { useState } from 'react';

export const useTestWorkflow = () => {
  const [searchBy, setSearchBy] = useState('');
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  return {
    searchBy,
    setSearchBy,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
  };
};
