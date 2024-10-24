import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants/routes';
import { WorkflowHeaderI } from './WorkflowHeader.interface';

export const useWorkflowHeader = (props: WorkflowHeaderI) => {
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
