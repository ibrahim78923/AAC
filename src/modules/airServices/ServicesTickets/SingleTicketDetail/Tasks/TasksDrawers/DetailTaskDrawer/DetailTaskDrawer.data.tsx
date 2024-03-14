import { Typography } from '@mui/material';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { styles } from './DetailTaskDrawer.styles';

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
          variant="body2"
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
      'dddd, DD MMM YYYY hh:mm A',
    )}`,
  },
  {
    id: 6,
    title: 'Planned Start Date',
    details: `${dayjs(taskDetail?.startDate)?.format('dddd, DD MMM YYYY')}`,
  },
  {
    id: 7,
    title: 'Planned End Date',
    details: `${dayjs(taskDetail?.endDate)?.format('dddd, DD MMM YYYY')}`,
  },
  {
    id: 8,
    title: 'Planned  Effort',
    details: taskDetail?.plannedEffort,
  },
];
export const statusOptions = ['Todo', 'In-Progress', 'Done'];
export const validationSchema: any = Yup?.object()?.shape({
  status: Yup?.string(),
  comments: Yup?.string(),
});
export const defaultValues = (data: any) => {
  return {
    status: data?.status ?? '',
    comments: data?.comments ?? '',
  };
};
