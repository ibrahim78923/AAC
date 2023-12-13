import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useWorkflowHeader = (props: any) => {
  const { watch } = props;
  const [openWorkflowModal, setOpenWorkflowModal] = useState(false);
  const { push } = useRouter();
  const handleMoveBack = () => push(AIR_OPERATIONS?.WORKFLOW_AUTOMATION);
  const scheduleWorkflow = watch('scheduleWorkflow');
  return {
    openWorkflowModal,
    setOpenWorkflowModal,
    handleMoveBack,
    scheduleWorkflow,
  };
};
