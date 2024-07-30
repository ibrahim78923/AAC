import { Palette } from '@mui/material';
import { UseFormWatch } from 'react-hook-form';

export interface WorkflowRunAndTriggerI {
  palette: Palette;
  watch: UseFormWatch<any>;
}
export interface WorkflowDropdownI {
  label: string;
  value: string;
}
