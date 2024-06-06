import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/utils/api';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';

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
      if (selectedRequestersList?.length > 1) {
        errorSnackbar('Please select only 1 requester');
        return;
      }
      setIsAgentConvert(true);
      close();
    },
  },
];

export const requestersList: any = (
  selectedRequestersList: any,
  setSelectedRequestersList: any,
  theme: any,
  router: any,
  tableListData: any = [],
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedRequestersList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestersList([
                ...selectedRequestersList,
                tableListData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setSelectedRequestersList(
                selectedRequestersList?.filter((item: any) => {
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
          !!tableListData?.length
            ? selectedRequestersList?.length === tableListData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestersList(tableListData?.map((item: any) => item))
            : setSelectedRequestersList([]);
        }}
        color="primary"
        name="_id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={1}
        onClick={() => {
          if (info?.row?.original?.status === REQUESTORS_STATUS?.INACTIVE) {
            errorSnackbar('This requester is not active');
            return;
          }
          router?.push({
            pathname: AIR_SERVICES?.SINGLE_REQUESTERS_DETAILS,
            query: { _id: info?.row?.original?._id },
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
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue(),
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
          {info?.getValue()}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.jobTitle,
    id: 'jobTitle',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => truncateText(info?.getValue()),
  },
];
