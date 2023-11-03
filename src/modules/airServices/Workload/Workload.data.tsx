import styles from './Workload.module.scss';
import { UserProfileImage } from '@/assets/images';

export const WorkloadData = [
  {
    start: '2023-11-02T15:30:00',
    end: '2023-11-03T15:30:00',
    className: styles?.completed,
    extendedProps: {
      status: 'Completed',
      img: UserProfileImage,
      ticketNo: 'TSK-1',
      description: 'Customizing Routes',
    },
  },
  {
    start: '2023-11-01T15:30:00',
    end: '2023-11-02T15:30:00',
    className: styles?.inProgress,
    extendedProps: {
      status: 'In Progress',
      img: UserProfileImage,
      ticketNo: 'TSK-2',
      description: 'Workload',
    },
  },
  {
    start: '2023-10-30T15:30:00',
    end: '2023-11-03T15:30:00',
    className: styles?.toDo,
    extendedProps: {
      status: 'To-Do',
      img: UserProfileImage,
      ticketNo: 'TSK-3',
      description: 'Give access to internal teams for  evaluation access',
    },
  },
];
