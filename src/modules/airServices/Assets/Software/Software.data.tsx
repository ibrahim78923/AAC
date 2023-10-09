import { Checkbox } from '@mui/material';

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
    accessorFn: (row: any) => row.Software,
    id: 'Software',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Software
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
    accessorFn: (row: any) => row.Status,
    id: 'Status',
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
    isSortable: true,
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
    accessorFn: (row: any) => row.Category,
    id: 'Category',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Category
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
    accessorFn: (row: any) => row.ContractValue,
    id: 'Contract Value',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Contract Value
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
    accessorFn: (row: any) => row.ManagedBy,
    id: 'Managed By',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Managed By
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
    accessorFn: (row: any) => row.Users,
    id: 'Users',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Users
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
    accessorFn: (row: any) => row.Installs,
    id: 'Installs',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Installs
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
    accessorFn: (row: any) => row.Type,
    id: 'Type',
    isSortable: true,
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
