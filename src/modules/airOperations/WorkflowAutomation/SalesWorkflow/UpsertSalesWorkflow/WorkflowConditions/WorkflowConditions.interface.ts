import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface WorkflowConditionsI {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}
