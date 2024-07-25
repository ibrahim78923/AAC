import { GridSize } from '@mui/material';

export interface ComponentPropsI {
  select?: boolean;
  [key: string]: any;
}

export interface OptionI {
  value: string | number;
  label: string;
}

export interface ProfileSecurityDataItemI {
  md?: GridSize;
  component: React.ComponentType<any>;
  componentProps: ComponentPropsI;
  options?: OptionI[];
}
