import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

export const agentActionsDropdown = (
  setOpenDeleteModal: any,
  setIsAgentModalOpen: any,
  selectedAgentList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_AGENTS,
    ],
    handleClick: (close: () => void) => {
      if (selectedAgentList?.length > 1) {
        errorSnackbar(`Can't update multiple records`);
        return;
      }
      setIsAgentModalOpen(true);
      close?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_AGENTS,
    ],
    handleClick: (close: () => void) => {
      setOpenDeleteModal?.(true);
      close?.();
    },
  },
];

export const agentsListsColumnsFunction = (
  selectedAgentList: any,
  setSelectedAgentList: any,
  processedAgentListData: any = [],
  router: any,
): any => [
  {
    accessorFn: (row: { _id: string }) => row?._id,
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
        checked={
          !!processedAgentListData?.length
            ? selectedAgentList?.length === processedAgentListData?.length
            : false
        }
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
    accessorFn: (row: { fullName: string }) => row?.fullName,
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
            query: {
              agentId: info?.row?.original?._id,
              departmentId: info?.row?.original?.departmentId,
              roleId: info?.row?.original?.permissionsRole,
            },
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
    accessorFn: (row: { email: string }) => row?.email,
    id: 'email',
    header: 'Email',
    isSortable: true,
    Cell: (info: any) => <>{info?.getValue()}</>,
  },
  {
    accessorFn: (row: { departmentData: any }) => row?.departmentData?.name,
    id: 'name',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => (
      <Typography variant="body2" textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: { accountsPermissions: any }) => row?.accountsPermissions,
    id: 'permissionsList',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => truncateText(info?.getValue()?.name),
  },
];
