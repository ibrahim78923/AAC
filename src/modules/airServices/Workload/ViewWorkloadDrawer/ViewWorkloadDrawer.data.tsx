import { TASK_STATUS } from '@/constants/strings';
import { Typography } from '@mui/material';
import { styles } from './ViewWorkloadDrawer.styles';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import * as Yup from 'yup';

const { DONE, IN_PROGRESS, TO_DO } = TASK_STATUS;

export const statusOptions = [TO_DO, IN_PROGRESS, DONE];

export const drawerDetail: any = (taskDetail: any, theme: any) => [
  {
    id: 1,
    title: 'Workspace',
    workspace: taskDetail?.departmentData?.name,
    details: taskDetail?.departmentData?.name,
  },
  {
    id: 2,
    title: 'Assign to',
    details: taskDetail?.assignedUser
      ? `${taskDetail?.assignedUser?.firstName} ${taskDetail?.assignedUser?.lastName}`
      : null,
    profile: taskDetail?.assignedUser?.avatar?.url,
  },
  {
    id: 3,
    title: 'Status',
    details: (() => {
      const statusValue = taskDetail?.status;
      return (
        <Typography
          variant={'body2'}
          component={'span'}
          sx={styles?.tableStatusStyle(statusValue, theme)}
        >
          {taskDetail?.status}
        </Typography>
      );
    })(),
  },
  {
    id: 4,
    title: 'Notify before',
    details: taskDetail?.notifyBefore
      ? `${taskDetail?.notifyBefore} minutes`
      : null,
  },
  {
    id: 5,
    title: 'Due Date',
    details: `${dayjs(taskDetail?.endDate)?.format(
      DATE_TIME_FORMAT?.ddddDDMMMYYYYhhmmA,
    )}`,
  },
  {
    id: 6,
    title: 'Planned Start Date',
    details: `${dayjs(taskDetail?.startDate)?.format(
      DATE_TIME_FORMAT?.ddddDDMMMYYYY,
    )}`,
  },
  {
    id: 7,
    title: 'Planned End Date',
    details: `${dayjs(taskDetail?.endDate)?.format(
      DATE_TIME_FORMAT?.ddddDDMMMYYYY,
    )}`,
  },
  {
    id: 8,
    title: 'Planned  Effort',
    details: taskDetail?.plannedEffort,
  },
];

export const overviewDataArray = (taskDetail: any) => {
  const customFields =
    taskDetail?.customFields &&
    typeof taskDetail?.customFields === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT
      ? Object?.keys(taskDetail?.customFields)?.reduce((acc: any, key: any) => {
          acc[key] = taskDetail?.customFields[key] ?? '---';
          return acc;
        }, {})
      : {};
  return { ...customFields };
};

export const validationSchema: any = Yup?.object()?.shape({
  status: Yup?.string()?.trim(),
  comments: Yup?.string()?.trim(),
});

export const defaultValues = (data: any) => {
  return {
    status: data?.status ?? '',
    comments: data?.comments ?? '',
  };
};
