import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useWorkflowHeader = (props: any) => {
  const { watch } = props;
  const [openWorkflowModal, setOpenWorkflowModal] = useState(false);
  const { push } = useRouter();
  const handleMoveBack = () => push(AIR_OPERATIONS?.SALES_WORKFLOW);
  return {
    openWorkflowModal,
    setOpenWorkflowModal,
    handleMoveBack,
    watch,
  };
};
