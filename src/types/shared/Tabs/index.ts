import { TextFieldProps } from '@mui/material';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CommonTabsProps {
  tabsArray?: string[];
  children?: React.ReactNode;
  isHeader?: boolean;
  headerChildren?: React.ReactNode;
  searchBarProps?: TextFieldProps;
}
