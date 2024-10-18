import { AntSwitch } from '@/components/AntSwitch';
import { Box, Checkbox, Chip, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import {
  GENERIC_UPSERT_FORM_CONSTANT,
  REQUESTORS_STATUS,
  WORKFLOW_TYPE,
} from '@/constants/strings';
import { DATE_TIME_FORMAT } from '@/constants';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import React from 'react';
import { capitalizeFirstLetter } from '@/utils/api';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';
import { getActivePermissionsSession } from '@/utils';

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
        <Typography
          variant="body2"
          textTransform={'capitalize'}
          component={'span'}
        >
          <TruncateText text={info?.getValue()?.toLowerCase()} />
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

export const eventBaseWorkflowTabsData = ['Tickets', 'Assets', 'Tasks'];
