import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useWorkflowHeader = (props: any) => {
  const { watch } = props;
  const [isWorkflowDrawer, setIsWorkflowDrawer] = useState(false);
  const { push, query } = useRouter();
  const workflowId = query?.id;
  const handleMoveBack = () => push(AIR_OPERATIONS?.SALES_WORKFLOW);
  return {
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    handleMoveBack,
    watch,
    workflowId,
  };
};
