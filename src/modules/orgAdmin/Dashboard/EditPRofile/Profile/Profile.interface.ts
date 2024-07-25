import { GridSize } from '@mui/material';

export interface ComponentProps {
  heading?: string;
  select?: boolean;
  [key: string]: any;
}

export interface Option {
  value: string | number;
  label: string;
}

export interface EditProfileDataItemI {
  md?: GridSize;
  component: React.ComponentType<any>;
  componentProps: ComponentProps;
  options?: Option[];
}
