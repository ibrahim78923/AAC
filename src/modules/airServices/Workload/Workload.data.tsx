import styles from './Workload.module.scss';
import { UserProfileImage } from '@/assets/images';

export const workloadData = [
  {
    start: '2023-11-06T15:30:00',
    end: '2023-11-07T15:30:00',
    className: styles?.completed,
    extendedProps: {
      status: 'Completed',
      img: UserProfileImage,
      ticketNo: 'TSK-1',
      description: 'Customizing Routes',
    },
  },
  {
    start: '2023-11-06T15:30:00',
    end: '2023-11-08T15:30:00',
    className: styles?.inProgress,
    extendedProps: {
      status: 'In Progress',
      img: UserProfileImage,
      ticketNo: 'TSK-2',
      description: 'Workload',
    },
  },
  {
    start: '2023-11-08T15:30:00',
    end: '2023-11-10T15:30:00',
    className: styles?.toDo,
    extendedProps: {
      status: 'To-Do',
      img: UserProfileImage,
      ticketNo: 'TSK-3',
      description: 'Give access to internal teams for  evaluation access',
    },
  },
];
