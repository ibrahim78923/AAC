import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface SubWorkflowConditionsI {
  control: Control<any>;
  index: number;
  parentField: any[];
  removeParent: (index: number) => void;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  conditionType: {
    label: string;
    value: string;
  };
}
export interface WorkflowConditionStateI {
  subIndex: number | null;
  newValue: string;
}
