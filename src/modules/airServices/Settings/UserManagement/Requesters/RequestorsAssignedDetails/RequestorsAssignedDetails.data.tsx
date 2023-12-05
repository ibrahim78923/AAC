import { Typography } from '@mui/material';
import { RequestorsAssignedDataI } from './RequestorsAssignedDetails.interface';
import { REQUESTORS_ASSIGNED_STATUS } from '@/constants/strings';

export const requestorAssignedData: RequestorsAssignedDataI[] = [
  {
    id: 1,
    ticketsid: '# SR - 5',
    name: 'Business Platform debt, docs, refactors and stability',
    duedate: 'Robert Fox',
    assignedto: 'Robert Fox',
    status: REQUESTORS_ASSIGNED_STATUS?.OPEN,
  },
  {
    id: 2,
    ticketsid: '# INC - 6',
    name: 'Search migration modelling',
    duedate: 'Ralph Edwards',
    assignedto: 'Robert Fox',
    status: REQUESTORS_ASSIGNED_STATUS?.CLOSED,
  },
  {
    id: 3,
    ticketsid: '# INC - 7',
    name: 'Style guide for online app store',
    duedate: 'Cameron Williamson',
    assignedto: 'Cameron Williamson',
    status: REQUESTORS_ASSIGNED_STATUS?.RESOLVED,
  },
];
export const requestorsAssigned: any = () => [
  {
    accessorFn: (row: any) => row?.ticketsid,
    id: 'ticketsid',
    header: 'Tickets ID',
    isSortable: true,
    cell: (info: any) => (
      <Typography
        sx={{
          color: 'primary.main',
          cursor: 'pointer',
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.duedate,
    id: 'duedate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assignedto,
    id: 'assignedto',
    isSortable: true,
    header: 'Assigned To',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
];
