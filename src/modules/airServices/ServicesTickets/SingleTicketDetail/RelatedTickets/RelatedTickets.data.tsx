import { Checkbox, Typography } from '@mui/material';
import { TableDataI } from './RelatedTickets.interface';

export const data: TableDataI[] = [
  {
    Id: 1,
    ticketsid: `# SR - 5`,
    taskname: 'Business Platform debt, docs, refactors and stability',
    duedate: 'Mar 3, - Mar 26, 2022',
    assignedto: 'Robert Fox',
    status: 'Open',
  },
  {
    Id: 2,
    ticketsid: `# INC - 6`,
    taskname: ' Search migration modelling',
    duedate: 'Mar 3, - Mar 26, 2022',
    assignedto: 'Esther Howard',
    status: 'Pending',
  },
  {
    Id: 3,
    ticketsid: `# INC - 7`,
    taskname: 'Style guide for online app store',
    duedate: 'Mar 3, - Mar 27, 2022',
    assignedto: 'Wade Warren',
    status: 'Resolved',
  },
];
export const columns: any = (
  setIsDrawerOpen: any,
  isActive: any,
  setActive: any,
  theme: any,
) => [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => (
      <Checkbox
        checked={!!isActive?.find((item: any) => item?.Id === info?.getValue())}
        onChange={(e: any) => {
          e?.target?.checked
            ? setActive([
                ...isActive,
                data?.find((item: any) => item?.Id === info?.getValue()),
              ])
            : setActive(
                isActive?.filter((item: any) => {
                  return item?.Id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={isActive?.length === data?.length}
        onChange={(e: any) => {
          e?.target?.checked ? setActive([...data]) : setActive([]);
        }}
        color="primary"
        name="Id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.ticketsid,
    id: 'ticketsid',
    header: 'Tickets ID',
    isSortable: true,
    cell: (info: any) => (
      <Typography
        sx={{
          color: 'info.main',
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.taskname,
    id: 'taskname',
    isSortable: true,
    header: 'Task Name',
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
    cell: (info: any) => {
      const status = info?.getValue();
      const color =
        status === 'Open'
          ? theme?.palette?.info?.main
          : status === 'Pending'
          ? theme?.palette?.error?.main
          : status === 'Resolved'
          ? theme?.palette?.warning?.main
          : '';
      return (
        <Typography
          sx={{
            border: color ? `1px solid ${color}` : 'none',
            color: color,
            padding: '3px 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          {status}
        </Typography>
      );
    },
    sortFunction: (a: any, b: any) => {
      const statusOrder: { [key: string]: number } = {
        Open: 1,
        Pending: 2,
        Resolved: 3,
      };
      return statusOrder[a?.status] - statusOrder[b?.status];
    },
  },
];
