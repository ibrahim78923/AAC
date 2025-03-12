import { AntSwitch } from '@/components/AntSwitch';
import { Box, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import {
  GENERIC_UPSERT_FORM_CONSTANT,
  REQUESTORS_STATUS,
  WORKFLOW_TYPE,
} from '@/constants/strings';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { capitalizeFirstLetter } from '@/utils/api';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { getActivePermissionsSession } from '@/utils';
import { uiDateFormat } from '@/lib/date-time';
import { CustomChip } from '@/components/Chip/CustomChip';
import Tickets from './Tickets';
import Assets from './Assets';
import Tasks from './Tasks';
import { tableCheckbox } from '@/utils/table-checkbox';

export const ScheduleWorkflowActionsDropdown = (
  handleActionClick: (type: string) => void,
  handleCloneWorkflow: () => void,
  selectedAction: any,
) => [
  {
    id: 1,
    title: 'Edit',
    disabled: selectedAction?.length > 1 ? true : false,
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.EDIT_WORKFLOW,
    ],
    handleClick: (close: any) => {
      handleActionClick('edit');
      close?.();
    },
  },
  {
    id: 2,
    title: 'Clone',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CLONE_WORKFLOW,
    ],
    handleClick: (close: any) => {
      handleActionClick('clone');
      handleCloneWorkflow();
      close?.();
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.DELETE,
    ],
    handleClick: (close: any) => {
      handleActionClick?.('delete');
      close?.();
    },
  },
];

export const listsColumnsFunction = (
  selectedAction: WorkflowI[],
  setSelectedAction: React.Dispatch<React.SetStateAction<any>>,
  listData: WorkflowI[],
  theme: any,
  handleChangeStatus: (data: WorkflowI) => void,
  switchLoading: any,
): any => [
  tableCheckbox({
    selectedList: selectedAction,
    setSelectedList: setSelectedAction,
    tableData: listData,
  }),
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    isSortable: false,
    header: 'Workflow Name',
    cell: (info: any) => (
      <Box display={'flex'} gap={0.3}>
        <Typography
          variant="body2"
          textTransform={'capitalize'}
          component={'span'}
        >
          <TruncateText text={info?.getValue()?.toLowerCase()} />
        </Typography>
        {info?.row?.original?.status ===
          GENERIC_UPSERT_FORM_CONSTANT?.DRAFT && (
          <CustomChip
            icon={
              <FiberManualRecordIcon
                fontSize="small"
                color={theme?.palette?.grey?.[900]}
              />
            }
            label="Draft"
            color="default"
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
      const activePermissionOfEditDelete =
        getActivePermissionsSession()?.includes(
          AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.ENABLE_DISABLE,
        );
      return (
        <AntSwitch
          disabled={
            !activePermissionOfEditDelete ||
            info?.row?.original?.activity?.type === WORKFLOW_TYPE?.SAVED
          }
          checked={getValues}
          isLoading={switchLoading?.[info?.row?.original?._id]}
          onClick={() => handleChangeStatus?.(info?.row?.original)}
        />
      );
    },
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: false,
    header: 'Created By',
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(
          info?.row?.original?.createdBy?.firstName,
          info?.row?.original?.createdBy?.lastName,
        )}
        name={fullName(
          info?.row?.original?.createdBy?.firstName,
          info?.row?.original?.createdBy?.lastName,
        )}
        avatarSrc={info?.row?.original?.createdBy?.avatar?.url}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdOn,
    id: 'createdOn',
    isSortable: false,
    header: 'Created On',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.activity,
    id: 'activity',
    isSortable: true,
    header: 'Last Activity',
    cell: (info: any) => {
      const type = info?.getValue()?.type;
      const capitalizedType = type
        ? capitalizeFirstLetter(type.toLowerCase())
        : '';
      const typeText = capitalizedType ? capitalizedType + ' by' + ' ' : null;
      return (
        <TruncateText
          text={`${typeText} ${fullName(
            info?.getValue()?.user?.firstName,
            info?.getValue()?.user?.lastName,
          )}`}
        />
      );
    },
  },
];

export const scheduledWorkflowTabsData = ['Tickets', 'Assets', 'Tasks'];

export const scheduleWorkflowTabsDataDynamic = [
  {
    _id: 1,
    name: 'Tickets',
    id: 'tickets',
    tabPermissions: [],
    component: Tickets,
    hasNoPermissions: true,
    componentProps: {},
  },
  {
    _id: 2,
    name: 'Assets',
    id: 'assets',
    hasNoPermissions: true,
    tabPermissions: [],
    component: Assets,
    componentProps: {},
  },
  {
    _id: 3,
    name: 'Tasks',
    id: 'tasks',
    hasNoPermissions: true,
    tabPermissions: [],
    component: Tasks,
    componentProps: {},
  },
];
