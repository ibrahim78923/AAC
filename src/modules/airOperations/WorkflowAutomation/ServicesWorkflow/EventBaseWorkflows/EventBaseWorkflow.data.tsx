import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box, Checkbox, Chip, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { REQUESTORS_STATUS } from '@/constants/strings';

export const EventBaseWorkflowActionsDropdown = (handleActionClick: any) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.EDIT_WORKFLOW,
    ],
    handleClick: () => {
      handleActionClick('edit');
    },
  },
  {
    id: 2,
    title: 'Clone',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CLONE_WORKFLOW,
    ],
    handleClick: () => {
      handleActionClick('clone');
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.DELETE,
    ],
    handleClick: () => {
      handleActionClick?.('delete');
    },
  },
];

export const listsColumnsFunction = (
  selectedAction: any,
  setSelectedAction: any,
  listData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedAction?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAction([
                ...selectedAction,
                listData?.find((item: any) => item?._id === info?.getValue()),
              ])
            : setSelectedAction(
                selectedAction?.filter((item: any) => {
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
          !!listData?.length
            ? selectedAction?.length === listData?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedAction([...listData])
            : setSelectedAction([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    isSortable: false,
    header: 'Workflow Name',
    cell: (info: any) => (
      <Box display={'flex'} gap={0.3}>
        {info?.getValue()}
        {info?.row?.original?.draft && (
          <Chip
            icon={
              <FiberManualRecordIcon
                fontSize="small"
                color={theme?.palette?.grey?.[900]}
              />
            }
            label="Draft"
            size="small"
          />
        )}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: false,
    cell: (info: any) => {
      const getValues =
        info?.getValue() === REQUESTORS_STATUS?.ACTIVE ? true : false;
      return (
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.ENABLE_DISABLE,
          ]}
        >
          <AntSwitch checked={getValues} />
        </PermissionsGuard>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: false,
    header: 'Created By',
    cell: (info: any) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar
          sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
          src={generateImage(info?.row?.original?.createdBy?.avatar?.url)}
        >
          <Typography variant="body3" textTransform={'uppercase'}>
            {fullNameInitial(
              info?.row?.original?.createdBy?.firstName,
              info?.row?.original?.createdBy?.lastName,
            )}
          </Typography>
        </Avatar>
        <Typography variant="body2" fontWeight={600} color="slateBlue.main">
          {fullName(
            info?.row?.original?.createdBy?.firstName,
            info?.row?.original?.createdBy?.lastName,
          )}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.createdOn,
    id: 'createdOn',
    isSortable: false,
    header: 'Created On',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format('MMMM DD, YYYY: hh:mm'),
  },
  {
    accessorFn: (row: any) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: false,
    header: 'Last Activity',
    cell: (info: any) =>
      fullName(
        info?.getValue()?.type ? info?.getValue()?.type + ' ' + 'by' : null,
        info?.getValue()?.user?.firstName + info?.getValue()?.user?.lastName,
      ),
  },
];

export const eventBaseWorkflowTabsData = [
  'Tickets',
  'Assets',
  'Tasks',
  // 'Meetings',
];
