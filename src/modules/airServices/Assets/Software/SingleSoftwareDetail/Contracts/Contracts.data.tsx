import { styles } from '../../../AssetHead/AssetHead.style';

export const data: any = [
  {
    id: 1,
    ContractName: 'Microsoft license',
    LicenseType: 'Volume',
    NoofLicenses: '1',
    Status: '22 Mar, 2023',
    CreatedDate: '22 Mar, 2023',
    ExpiryDate: '26 Oct, 2023',
  },
];
export const columns = (theme: any) => [
  {
    accessorFn: (row: any) => row.ContractName,
    id: 'Contract Name',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Contract Name</span>,
    cell: (info: any) => (
      <span style={styles.firstCellStyle}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.LicenseType,
    id: 'License Type',
    header: <span style={styles.headerStyle(theme)}>License Type</span>,
    isSortable: true,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.NoofLicenses,
    id: 'No of Licenses',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>No of Licenses</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Status</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.CreatedDate,
    id: 'Created Date',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Created Date</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.ExpiryDate,
    id: 'Expiry Date',
    isSortable: true,
    header: <span style={styles.headerStyle(theme)}>Expiry Date</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
