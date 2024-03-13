import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
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
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={1}
        onClick={() => {
          if (info?.row?.original?.status === REQUESTORS_STATUS?.INACTIVE) {
            errorSnackbar('This agent is not active');
            return;
          }
          router?.push({
            pathname: AIR_SERVICES?.SINGLE_AGENT_DETAILS,
            query: { agentId: info?.row?.original?._id },
          });
        }}
      >
        <Avatar
          sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
          src={generateImage(info?.row?.original?.avatar?.url)}
        >
          <Typography variant="body3" textTransform={'uppercase'}>
            {fullNameInitial(
              info?.row?.original?.firstName,
              info?.row?.original?.lastName,
            )}
          </Typography>
        </Avatar>
        <Typography variant="body2" fontWeight={600} color="slateBlue.main">
          {fullName(
            info?.row?.original?.firstName,
            info?.row?.original?.lastName,
          )}
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
