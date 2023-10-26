import { AvatarImage } from '@/assets/images';
import { styles } from './DetailTaskDrawer.styles';

export const drawerDetail: any = (taskDetail: any, theme: any) => [
  {
    id: 1,
    title: 'Workspace',
    workspace: taskDetail?.workspace,
    details: taskDetail?.workspace,
  },
  {
    id: 2,
    title: 'Assign to',
    details: taskDetail?.assignedTo,
    profile: AvatarImage,
  },
  {
    id: 3,
    title: 'Status',
    details: (() => {
      const statusValue = taskDetail?.status;
      return (
        <span style={styles?.tableStatusStyle(statusValue, theme)}>
          {taskDetail?.status}
        </span>
      );
    })(),
  },
  {
    id: 4,
    title: 'Notify before',
    details: taskDetail?.notifyBefore,
  },
  {
    id: 5,
    title: 'Due Date',
    details: taskDetail?.dueDate,
  },
  {
    id: 6,
    title: 'Planned Start Date',
    details: taskDetail?.plannedStartDate,
  },
  {
    id: 7,
    title: 'Planned End Date',
    details: taskDetail?.dueDate,
  },
  {
    id: 8,
    title: 'Planned  Effort',
    details: taskDetail?.plannedEffort,
  },
];
