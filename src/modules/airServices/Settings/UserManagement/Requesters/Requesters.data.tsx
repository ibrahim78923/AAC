import { Box, Typography } from '@mui/material';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/lib/snackbar';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';
import { tableCheckbox } from '@/utils/table-checkbox';

export const requestersDropdown: any = (
  setDeleteModalOpen: any,
  setIsAgentConvert: any,
  selectedRequestersList: any,
) => [
  {
    id: 1,
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.DELETE_REQUESTER,
    ],
    handleClick: (close: any) => {
      setDeleteModalOpen(true);
      close();
    },
  },
  {
    id: 2,
    title: 'Convert to Agent',
    permissionKey: [
      AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.CONVERT_TO_AGENT_REQUESTER,
    ],
    handleClick: (close: any) => {
      setIsAgentConvert(true);
      close();
    },
    disabled: selectedRequestersList?.length > 1,
  },
];

export const requestersList: any = (
  selectedRequestersList: any,
  setSelectedRequestersList: any,
  theme: any,
  router: any,
  tableListData: any = [],
) => [
  tableCheckbox({
    selectedList: selectedRequestersList,
    setSelectedList: setSelectedRequestersList,
    tableData: tableListData,
  }),
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box sx={{ cursor: 'pointer' }}>
        <TruncateText
          text={
            <UserInfo
              handleBoxClick={() => {
                if (
                  info?.row?.original?.status === REQUESTORS_STATUS?.INACTIVE
                ) {
                  errorSnackbar('This requester is not active');
                  return;
                }
                router?.push({
                  pathname: AIR_SERVICES?.SINGLE_REQUESTERS_DETAILS,
                  query: { _id: info?.row?.original?._id },
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
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    Cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Activation Status',
    cell: (info: any) => {
      const status = info?.getValue();
      const color =
        status === REQUESTORS_STATUS?.ACTIVE
          ? theme?.palette?.success?.main
          : status === REQUESTORS_STATUS?.INACTIVE
            ? theme?.palette?.warning?.main
            : '';

      return (
        <Typography
          variant="body2"
          color="slateBlue.main"
          sx={{
            color: color,
          }}
        >
          <TruncateText text={info?.getValue()?.toLowerCase()} />
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.jobTitle,
    id: 'jobTitle',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
];
