import { Checkbox } from '@mui/material';
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
  router: any,
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
    header: <span>Software</span>,
    cell: (info: any) => (
      <span
        onClick={() =>
          router.push({
            pathname:
              'http://localhost:3000/air-services/assets/software/detail',
            query: {
              softwareId: info?.row?.id,
            },
          })
        }
        style={{ color: '#0AADC7', cursor: 'pointer' }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Status,
    id: 'Status',
    header: <span>Status</span>,
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Category,
    id: 'Category',
    isSortable: true,
    header: <span>Category</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ContractValue,
    id: 'Contract Value',
    isSortable: true,
    header: <span>Contract Value</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.ManagedBy,
    id: 'Managed By',
    isSortable: true,
    header: <span>Managed By</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Users,
    id: 'Users',
    isSortable: true,
    header: <span>Users</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Installs,
    id: 'Installs',
    isSortable: true,
    header: <span>Installs</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Type,
    id: 'Type',
    isSortable: true,
    header: <span>Type</span>,
    cell: (info: any) => info.getValue(),
  },
];
