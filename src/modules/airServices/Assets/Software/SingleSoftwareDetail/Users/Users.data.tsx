import { Checkbox } from '@mui/material';
import { styles } from '../../../Header/Header.style';

export const userDropdown = [
  {
    title: 'Edit',
    handleClick: (x: any) => {
      x?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (x: any) => {
      x?.();
    },
  },
];

export const data: any = [
  {
    id: 1,
    Name: 'Andrea',
    Department: '-',
    Source: '-',
    Usage: '-',
    FirstSeen: '22 Mar, 2023',
    LastSeen: '22 Mar, 2023',
    AssignedDate: '22 Mar, 2023',
    Contract: 'Freshservice Trial License',
  },
];
export const columns = (
  installationData: any,
  setInstallationData: any,
  meetingsMainData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!installationData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setInstallationData([
                ...installationData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setInstallationData(
                installationData.filter((item: any) => {
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
        checked={installationData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setInstallationData([...meetingsMainData])
            : setInstallationData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Name,
    id: 'Name',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Name</span>,
    cell: (info: any) => (
      <span style={styles.firstCellStyle}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    header: <span style={styles.headerStyle(theme)}>Department</span>,
    isSortable: true,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Source,
    id: 'Source',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Source</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Usage,
    id: 'Usage',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Usage %</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.FirstSeen,
    id: 'First Seen',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>First Seen</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.LastSeen,
    id: 'Last Seen',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Last Seen</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.AssignedDate,
    id: 'Assigned Date',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Assigned Date</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Contract,
    id: 'Contract',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Contract</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
