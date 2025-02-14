import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { WORKFLOW_STATUS } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useChangeStatusWorkflowMutation } from '@/services/airOperations/workflow-automation/sales-workflow';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { getActivePermissionsSession } from '@/utils';

export const useWorkflowStatus = () => {
  const [changeStatusTrigger, { isLoading }] =
    useChangeStatusWorkflowMutation();
  const handleChangeStatus = async (rowData: WorkflowI) => {
    const status =
      rowData?.status === WORKFLOW_STATUS?.ACTIVE
        ? WORKFLOW_STATUS?.INACTIVE
        : WORKFLOW_STATUS?.ACTIVE;
    try {
      await changeStatusTrigger({
        id: rowData?._id,
        body: { status },
      })?.unwrap();
      successSnackbar(
        `${rowData?.title} ${status?.toLocaleLowerCase()} successfully`,
      );
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  const statusPermission = getActivePermissionsSession()?.includes(
    AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.ACTIVE_INACTIVE_WORKFLOW,
  );
  return {
    handleChangeStatus,
    statusPermission,
    isLoading,
  };
};
