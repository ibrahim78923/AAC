import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { AIR_OPERATIONS } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useWorkflowHeader = (props: any) => {
  const { watch } = props;
  const [openWorkflowModal, setOpenWorkflowModal] = useState(false);
  const { push } = useRouter();
  const handleMoveBack = () => push(AIR_OPERATIONS?.WORKFLOW_AUTOMATION);
  const handleCancel = () => push(AIR_OPERATIONS?.SALES_WORKFLOW);
  const handleSaveDefault = () => {
    enqueueSnackbar('Workflow saved as draft successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const scheduleWorkflow = watch('scheduleWorkflow');
  return {
    openWorkflowModal,
    setOpenWorkflowModal,
    handleMoveBack,
    scheduleWorkflow,
    handleSaveDefault,
    handleCancel,
  };
};
