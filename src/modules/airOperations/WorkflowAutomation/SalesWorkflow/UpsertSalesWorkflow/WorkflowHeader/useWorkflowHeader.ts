import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useWorkflowHeader = (props: any) => {
  const { watch } = props;
  const { push, query } = useRouter();
  const workflowId = query?.id;
  const handleMoveBack = () => push(AIR_OPERATIONS?.SALES_WORKFLOW);
  return {
    handleMoveBack,
    watch,
    workflowId,
  };
};
