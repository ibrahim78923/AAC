import { Avatar, Box, Checkbox } from '@mui/material';

export const agentActionsDropdown = (handleActionClick: any) => [
  {
    title: 'Edit',
    handleClick: (close: any) => {
      handleActionClick('edit');
      close?.(false);
    },
  },
  {
    title: 'Delete',
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];

export const agentsListsColumnsFunction = (
  selectedAgentList: any,
  setSelectedAgentList: any,
  processedAgentListData: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedAgentList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAgentList([
                ...selectedAgentList,
                processedAgentListData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setSelectedAgentList(
                selectedAgentList?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedAgentList?.length === processedAgentListData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAgentList([...processedAgentListData])
            : setSelectedAgentList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.fullName,
    id: 'fullName',
    isSortable: true,
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
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.departmentData?.name,
    id: 'name',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.role,
    id: 'role',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => info?.getValue(),
  },
];
