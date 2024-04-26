import { useState } from 'react';

export const useTestWorkflow = (props: any) => {
  const { setOpenWorkflowModal } = props;
  const [searchBy, setSearchBy] = useState('');
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  const handleSubmit = () => {
    setIsWorkflowDrawer(true);
    setOpenWorkflowModal(false);
  };
  return {
    searchBy,
    setSearchBy,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    handleSubmit,
  };
};
