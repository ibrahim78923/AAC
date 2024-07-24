import { Theme } from '@mui/material';

export interface FilterValuesI {
  status?: string;
  type?: string;
  createdDate?: string;
}

export interface AddNewsEventValuesI {
  name: string;
  type: string;
  description?: string | undefined;
}

export interface RowDataI {
  _id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  status: string;
}

export type ColumnsPropsI = (
  selectedRow: string[],
  setSelectedRow: React.Dispatch<React.SetStateAction<string[]>>,
  theme: Theme,
) => any[];
