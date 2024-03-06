import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box, Checkbox, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

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
export const supervisorListData: any = [
  {
    id: 1,
    workflowName: 'Update Assets',
    status: true,
    createdBy: 'Jane Cooper',
    createdOn: 'Oct 15, 2023 4:56:44 PM',
    lastActivity: 'Update by Andrew',
  },
  {
    id: 2,
    workflowName: 'Update Task',
    status: false,
    createdBy: 'Esther Howard',
    createdOn: 'Oct 15, 2023 4:56:44 PM',
    lastActivity: 'Update by Shaw',
  },
  {
    id: 3,
    workflowName: 'Update Task',
    createdBy: 'Esther Howard',
    createdOn: 'Oct 15, 2023 4:56:44 PM',
    lastActivity: 'Update by Shaw',
    draft: true,
  },
];
export const supervisorListsColumnsFunction = (
  selectedSupervisorList: any,
  setSelectedSupervisorList: any,
  listData: any,
  theme: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedSupervisorList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedSupervisorList([
                ...selectedSupervisorList,
                supervisorListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedSupervisorList(
                selectedSupervisorList?.filter((item: any) => {
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
        checked={selectedSupervisorList?.length === listData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedSupervisorList([...listData])
            : setSelectedSupervisorList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.workflowName,
    id: 'workflowName',
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
    cell: (info: any) => (
      <PermissionsGuard
        permissions={[
          AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.ENABLE_DISABLE,
        ]}
      >
        <AntSwitch values={info?.getValue()} />{' '}
      </PermissionsGuard>
    ),
  },
  {
    accessorFn: (row: any) => row?.createdBy,
    id: 'createdBy',
    isSortable: false,
    header: 'Created By',
    cell: (info: any) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar />
        {info?.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.createdOn,
    id: 'createdOn',
    isSortable: false,
    header: 'Created On',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.lastActivity,
    id: 'lastActivity',
    isSortable: false,
    header: 'Last Activity',
    cell: (info: any) => info?.getValue(),
  },
];
