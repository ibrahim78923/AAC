import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface WorkflowScheduleI {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}
