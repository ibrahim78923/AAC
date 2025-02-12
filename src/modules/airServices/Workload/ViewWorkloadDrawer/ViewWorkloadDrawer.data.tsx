import { TASK_STATUS } from '@/constants/strings';
import { DATE_TIME_FORMAT } from '@/constants';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { otherDateFormat } from '@/lib/date-time';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CHIP_SHAPE, CHIP_VARIANTS } from '@/constants/mui-constant';

const { DONE, IN_PROGRESS, TO_DO } = TASK_STATUS;

export const statusOptions = [TO_DO, IN_PROGRESS, DONE];

const STATUS_CHIP_STYLE = {
  [TASK_STATUS?.TO_DO]: {
    borderColor: `primary.main`,
    backgroundColor: 'primary.lighter',
    color: 'primary.main ',
  },
  [TASK_STATUS?.IN_PROGRESS]: {
    borderColor: `custom.bright`,
    backgroundColor: 'custom.aqua_breeze',
    color: 'custom.bright',
  },
  [TASK_STATUS.DONE]: {
    borderColor: 'custom.custom_red',
    backgroundColor: 'custom.light_error',
    color: 'error.dark',
  },
};

export const drawerDetail: any = (taskDetail: any) => [
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
    details: (
      <CustomChip
        label={taskDetail?.status}
        shape={CHIP_SHAPE?.SQUARE}
        variant={CHIP_VARIANTS?.OUTLINED}
        size="medium"
        backgroundColor={
          STATUS_CHIP_STYLE?.[taskDetail?.status]?.backgroundColor
        }
        textColor={STATUS_CHIP_STYLE?.[taskDetail?.status]?.color}
        borderColor={STATUS_CHIP_STYLE?.[taskDetail?.status]?.borderColor}
      />
    ),
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
    details: `${otherDateFormat(
      taskDetail?.endDate,
      DATE_TIME_FORMAT?.ddddDDMMMYYYYhhmmA,
    )}`,
  },
  {
    id: 6,
    title: 'Planned Start Date',
    details: `${otherDateFormat(
      taskDetail?.startDate,
      DATE_TIME_FORMAT?.ddddDDMMMYYYY,
    )}`,
  },
  {
    id: 7,
    title: 'Planned End Date',
    details: `${otherDateFormat(
      taskDetail?.endDate,
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
