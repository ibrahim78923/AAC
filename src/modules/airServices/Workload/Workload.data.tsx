import styles from './Workload.module.scss';

export const WorkloadData = [
  {
    title: 'ANC',
    start: '2023-11-02T15:30:00',
    end: '2023-11-03T15:30:00',
    test: '123',
    className: styles?.completed,
  },
  {
    title: 'ANC',
    start: '2023-11-01T15:30:00',
    end: '2023-11-02T15:30:00',
    className: styles?.inProgress,
  },
  {
    title: 'ANC',
    start: '2023-10-30T15:30:00',
    end: '2023-11-03T15:30:00',
    className: styles?.toDo,
  },
];
