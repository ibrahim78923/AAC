import { Checkbox } from '@mui/material';
import { styles } from '../AssetHead/AssetHead.style';
import { RHFSelect } from '@/components/ReactHookForm';

export const dataArray = [
  {
    options: [
      { value: 'Add & Assign', label: 'Add & Assign' },
      { value: 'Operation', label: 'Operation' },
    ],
    component: RHFSelect,
  },
];

export const data: any = [
  {
    id: 1,
    Software: 'Freshservice',
    Status: 'Managed',
    Category: '---',
    ContractValue: '---',
    ManagedBy: '---',
    Users: '---',
    Installs: '1',
    Type: '---',
  },
  {
    id: 2,
    Software: 'Microsoft Office 365',
    Status: 'Managed',
    Category: '---',
    ContractValue: '---',
    ManagedBy: '---',
    Users: '---',
    Installs: '2',
    Type: '---',
  },
];
export const columns = (
  softwareData: any,
  setSoftwareData: any,
  data: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!softwareData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setSoftwareData([
                ...softwareData,
                data.find((item: any) => item.id === info.getValue()),
              ])
            : setSoftwareData(
                softwareData.filter((item: any) => {
                  return item.id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={softwareData.length === data.length}
        onChange={(e: any) => {
          e.target.checked ? setSoftwareData([...data]) : setSoftwareData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Software,
    id: 'Software',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Software</span>,
    cell: (info: any) => (
      <span style={styles.firstCellStyle}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    header: <span style={styles.headerStyle(theme)}>Status</span>,
    isSortable: true,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Category,
    id: 'Category',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Category</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.ContractValue,
    id: 'Contract Value',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Contract Value</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.ManagedBy,
    id: 'Managed By',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Managed By</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Users,
    id: 'Users',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Users</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Installs,
    id: 'Installs',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Installs</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Type,
    id: 'Type',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Type</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
