import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useWorkflowHeader = () => {
  const [openWorkflowModal, setOpenWorkflowModal] = useState(false);
  const { push } = useRouter();
  const handleMoveBack = () => push(AIR_OPERATIONS?.SERVICES_WORKFLOW);
  return {
    openWorkflowModal,
    setOpenWorkflowModal,
    handleMoveBack,
  };
};
