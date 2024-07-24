import { SelectChangeEvent } from '@mui/material/Select';

export interface filtersI {
  status: string;
}

export interface RowDataI {
  _id: string;
  name?: string;
  companyAccount?: { accountName?: string };
  email?: string;
  phoneNumber?: string;
  query?: string;
  status?: string;
}

export type ColumnsProps = (
  selectedRow: string[],
  setSelectedRow: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedRowData: React.Dispatch<React.SetStateAction<RowDataI | null>>,
  handleStatusChange: (row: RowDataI, event: SelectChangeEvent) => void,
  patchEnquiriesStatus: any,
) => any[];
