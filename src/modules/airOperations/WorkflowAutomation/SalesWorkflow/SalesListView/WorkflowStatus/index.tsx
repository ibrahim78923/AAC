import { AntSwitch } from '@/components/AntSwitch';
import { REQUESTORS_STATUS, WORKFLOW_TYPE } from '@/constants/strings';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { useWorkflowStatus } from './useWorkflowStatus';

export const WorkflowStatus = ({ rowData }: { rowData: WorkflowI }) => {
  const { handleChangeStatus, statusPermission, isLoading } =
    useWorkflowStatus();
  return (
    <AntSwitch
      disabled={
        rowData?.activity?.type === WORKFLOW_TYPE?.SAVED || !statusPermission
      }
      checked={rowData?.status === REQUESTORS_STATUS?.ACTIVE}
      isLoading={isLoading}
      onClick={() => handleChangeStatus?.(rowData)}
    />
  );
};
