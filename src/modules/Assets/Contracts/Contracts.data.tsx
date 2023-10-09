import { Checkbox } from '@mui/material';

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
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Contract Name
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#0AADC7',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Type,
    id: 'Type',
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Type
      </span>
    ),
    isSortable: false,
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    isSortable: false,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Status
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.RenewalStatus,
    id: 'Renewal Status',
    isSortable: false,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Renewal Status
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.ContractNumber,
    id: 'Contract Number',
    isSortable: false,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Contract Number
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Vendor,
    id: 'Vendor',
    isSortable: false,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Vendor
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.ExpiryDate,
    id: 'Expiry Date',
    isSortable: false,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Expiry Date
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
];
