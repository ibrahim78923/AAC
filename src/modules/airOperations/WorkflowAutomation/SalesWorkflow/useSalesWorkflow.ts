import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants/routes';

export const useSalesWorkflow = () => {
  const { push } = useRouter();
  const handleBack = () => {
    push({
      pathname: AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
    });
  };
  const handleCreateWorkflow = () => {
    push(AIR_OPERATIONS?.UPSERT_SALES_WORKFLOW);
  };
  return {
    handleBack,
    handleCreateWorkflow,
  };
};
