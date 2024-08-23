import { useGetAuthAccountsForOperationsReportsQuery } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';
import { WorkflowAutomationTypesI } from './WorkflowAutomation.interface';
import { workflowAutomationTypesDynamic } from './WorkflowAutomation.data';

export const useWorkflowAutomation = () => {
  const router = useRouter();

  const { data, isLoading, isError, isFetching, refetch } =
    useGetAuthAccountsForOperationsReportsQuery?.(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const workflowAutomationTypes: WorkflowAutomationTypesI[] =
    workflowAutomationTypesDynamic(data);

  return {
    isLoading,
    isError,
    isFetching,
    workflowAutomationTypes,
    router,
    refetch,
  };
};
