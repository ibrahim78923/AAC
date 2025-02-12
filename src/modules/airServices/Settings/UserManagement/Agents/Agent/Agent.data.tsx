import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

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
      setIsAgentModalOpen(true);
      close?.();
    },
    disabled: selectedAgentList?.length > 1,
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
      <CheckboxField
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
        name={info?.getValue()}
      />
    ),
    header: (
      <CheckboxField
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
      <Box sx={{ cursor: 'pointer' }}>
        <TruncateText
          text={
            <UserInfo
              handleBoxClick={() => {
                if (
                  info?.row?.original?.status === REQUESTORS_STATUS?.INACTIVE
                ) {
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
              nameInitial={fullNameInitial(
                info?.row?.original?.firstName,
                info?.row?.original?.lastName,
              )}
              name={fullName(
                info?.row?.original?.firstName?.toLowerCase(),
                info?.row?.original?.lastName?.toLowerCase(),
              )}
              avatarSrc={info?.row?.original?.avatar?.url}
            />
          }
        />
      </Box>
    ),
  },
  {
    accessorFn: (row: { email: string }) => row?.email,
    id: 'email',
    header: 'Email',
    isSortable: true,
    Cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: { departmentData: any }) => row?.departmentData?.name,
    id: 'name',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: { accountsPermissions: any }) => row?.accountsPermissions,
    id: 'permissionsList',
    isSortable: true,
    header: 'Role',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.name?.toLowerCase()} />
    ),
  },
];
