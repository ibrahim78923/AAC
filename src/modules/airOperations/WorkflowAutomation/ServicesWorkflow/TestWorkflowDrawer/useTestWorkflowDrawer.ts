import { useEffect, useState } from 'react';
import { TestWorkflowDrawerProps } from './TestWorkflowDrawer.interface';
import { usePostTestSalesWorkflowMutation } from '@/services/airOperations/workflow-automation/sales-workflow';
import { PAGINATION } from '@/config';
import { useAppSelector } from '@/redux/store';
import { useTheme } from '@mui/material';
import { workflowModule } from './TestWorkflowDrawer.data';
import { errorSnackbar } from '@/utils/api';

export const useTestWorkflowDrawer = (props: TestWorkflowDrawerProps) => {
  const { isWorkflowDrawer, setIsWorkflowDrawer, watch } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const { palette } = useTheme();
  const [testWorkflowTrigger, testWorkflowStatus] =
    usePostTestSalesWorkflowMutation();
  const { testServicesWorkflowBody } = useAppSelector(
    (state) => state?.servicesWorkflow,
  );
  const handleTestWorkflow = async () => {
    const queryParams = {
      params: { page, limit },
      body: testServicesWorkflowBody,
    };
    try {
      await testWorkflowTrigger(queryParams)?.unwrap();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  useEffect(() => {
    if (isWorkflowDrawer) {
      handleTestWorkflow();
    }
  }, [isWorkflowDrawer, page, limit]);
  type ModuleKey = keyof typeof workflowModule;
  const moduleSelectedOption: ModuleKey = watch('module');
  const titleData = workflowModule[moduleSelectedOption];
  return {
    setPage,
    setLimit,
    palette,
    titleData,
    isWorkflowDrawer,
    setIsWorkflowDrawer,
    testWorkflowStatus,
    handleTestWorkflow,
    watch,
  };
};
