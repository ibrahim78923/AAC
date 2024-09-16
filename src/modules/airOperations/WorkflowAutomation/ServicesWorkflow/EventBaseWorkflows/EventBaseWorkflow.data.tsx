import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box, Checkbox, Chip, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import {
  GENERIC_UPSERT_FORM_CONSTANT,
  REQUESTORS_STATUS,
  WORKFLOW_TYPE,
} from '@/constants/strings';
import { DATE_TIME_FORMAT } from '@/constants';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/api';

export const EventBaseWorkflowActionsDropdown = (
  handleActionClick: (type: string) => void,
  handleCloneWorkflow: () => void,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.EDIT_WORKFLOW,
    ],
    handleClick: (close: (arg: boolean) => void) => {
      handleActionClick('edit');
      close?.(false);
    },
  },
  {
    id: 2,
    title: 'Clone',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CLONE_WORKFLOW,
    ],
    handleClick: (close: (arg: boolean) => void) => {
      handleActionClick('clone');
      handleCloneWorkflow();
      close?.(false);
    },
  },
  {
    id: 3,
    title: 'Delete',
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.DELETE,
    ],
    handleClick: (close: (arg: boolean) => void) => {
      handleActionClick?.('delete');
      close?.(false);
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
) => [
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
        <Typography variant="body2" textTransform={'capitalize'}>
          {truncateText(info?.getValue()?.toLowerCase())}
        </Typography>
        {info?.row?.original?.status ===
          GENERIC_UPSERT_FORM_CONSTANT?.DRAFT && (
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
          <AntSwitch
            disabled={
              info?.row?.original?.activity?.type === WORKFLOW_TYPE?.SAVED
            }
            checked={getValues}
            isLoading={switchLoading?.[info?.row?.original?._id]}
            onClick={() => handleChangeStatus?.(info?.row?.original)}
          />
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
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
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
        <Typography variant="body2">
          {typeText}
          {fullName(
            info?.getValue()?.user?.firstName,
            info?.getValue()?.user?.lastName,
          )}
        </Typography>
      );
    },
  },
];

export const eventBaseWorkflowTabsData = ['Tickets', 'Assets', 'Tasks'];
