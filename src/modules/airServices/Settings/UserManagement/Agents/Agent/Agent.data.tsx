import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

export const agentActionsDropdown = (handleActionClick: any) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_AGENTS,
    ],
    handleClick: (close: any) => {
      handleActionClick('edit');
      close?.(false);
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_AGENTS,
    ],
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];

export const agentsListsColumnsFunction = (
  selectedAgentList: any,
  setSelectedAgentList: any,
  processedAgentListData: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
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
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
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
        <Typography
          color="blue.main"
          sx={{
            cursor: 'pointer',
          }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.SINGLE_AGENT_DETAILS,
              query: { agentId: info?.row?.original?._id },
            })
          }
        >
          {info?.getValue()}
        </Typography>
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
