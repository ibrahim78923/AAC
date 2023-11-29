import { Avatar, Box, Checkbox } from '@mui/material';

export const agentActionsDropdown = (handleActionClick: any) => [
  {
    title: 'Edit',
    handleClick: () => {
      handleActionClick('edit');
    },
  },
  {
    title: 'Delete',
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];

export const agentListData: any = [
  {
    id: 1,
    agentName: 'Enee Well',
    email: 'eneeewell@gmail.com',
    department: 'IT',
    role: 'IT Agent',
  },
  {
    id: 2,
    agentName: 'Nilson Mandela',
    email: 'nilsonmadela@gmail.com',
    department: 'Customer success',
    role: 'Customer Support Agent',
  },
];
export const agentsListsColumnsFunction = (
  selectedAgentList: any,
  setSelectedAgentList: any,
  listData: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedAgentList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAgentList([
                ...selectedAgentList,
                agentListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedAgentList(
                selectedAgentList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedAgentList?.length === listData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAgentList([...listData])
            : setSelectedAgentList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.agentName,
    id: 'agentName',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar sx={{ backgroundColor: 'gray' }} />
        {info?.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    header: 'Email',
    isSortable: false,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.department,
    id: 'department',
    isSortable: false,
    header: 'Department',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: false,
    header: 'Role',
    cell: (info: any) => info?.getValue(),
  },
];
