import { Dispatch, SetStateAction } from 'react';
import { UseFormWatch } from 'react-hook-form';

export interface WorkflowHeaderI {
  isLoading: boolean;
  saveLoading: boolean;
  setValidation: Dispatch<SetStateAction<string>>;
  watch: UseFormWatch<any>;
  testWorkflowResponse: any;
  testLoading: boolean;
  isWorkflowDrawer: boolean;
  setIsWorkflowDrawer: Dispatch<SetStateAction<boolean>>;
}
