import { Checkbox } from '@mui/material';
import { styles } from '../Header/Header.style';

export const data: any = [
  {
    id: 1,
    ContractName: 'Microsoft license',
    Type: 'Software license',
    Status: 'Active',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 2,
    ContractName: 'Dell Contract',
    Type: 'Lease',
    Status: 'Active',
    RenewalStatus: 'Extended',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 3,
    ContractName: 'Apple License',
    Type: 'Warranty',
    Status: 'Terminated',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
  {
    id: 4,
    ContractName: 'Dell license',
    Type: 'Warranty',
    Status: 'Draft',
    RenewalStatus: '---',
    ContractNumber: 'CNTR-3',
    Vendor: 'Microsoft',
    ExpiryDate: '26 Oct, 2023',
  },
];
export const columns = (
  meetingsData: any,
  setMeetingsData: any,
  meetingsMainData: any,
  theme: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!meetingsData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([
                ...meetingsData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setMeetingsData(
                meetingsData.filter((item: any) => {
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
        checked={meetingsData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([...meetingsMainData])
            : setMeetingsData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.ContractName,
    id: 'Contract Name',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Contract Name</span>,
    cell: (info: any) => (
      <span
        onClick={() =>
          router.push({
            pathname:
              'http://localhost:3000/air-services/assets/contracts/detail',
            query: {
              contractId: info?.row?.id,
            },
          })
        }
        style={{ ...styles.firstCellStyle, cursor: 'pointer' }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Type,
    id: 'Type',
    header: <span style={styles.headerStyle(theme)}>Type</span>,
    isSortable: false,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Status</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.RenewalStatus,
    id: 'Renewal Status',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Renewal Status</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.ContractNumber,
    id: 'Contract Number',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Contract Number</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.Vendor,
    id: 'Vendor',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Vendor</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
  {
    accessorFn: (row: any) => row.ExpiryDate,
    id: 'Expiry Date',
    isSortable: false,
    header: <span style={styles.headerStyle(theme)}>Expiry Date</span>,
    cell: (info: any) => (
      <span style={styles.cellStyle(theme)}>{info.getValue()}</span>
    ),
  },
];
