import { Dispatch, SetStateAction } from 'react';
import { UseFormWatch } from 'react-hook-form';

export interface TestWorkflowDrawerProps {
  isWorkflowDrawer: boolean;
  setIsWorkflowDrawer: Dispatch<SetStateAction<boolean>>;
  watch: UseFormWatch<any>;
}
export interface WorkflowModuleTitleI {
  TICKETS: string;
  ASSETS: string;
  TICKETS_TASKS: string;
}
