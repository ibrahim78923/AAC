import { IItemData } from '../EmailNotification.interface';

export const taskData: IItemData[] = [
  {
    _id: 1,
    heading: 'Requester Notification',
    details: [
      {
        _id: 'taskAssignToAgent',
        title: 'Task Assigned to Agent',
      },
      {
        _id: 'taskReassignToAgent',
        title: 'Task Reassigned to Agent',
      },
      {
        _id: 'taskRescheduled',
        title: 'Task Rescheduled',
      },
      {
        _id: 'taskClosed',
        title: 'Task Closed',
      },
      {
        _id: 'taskReminder',
        title: 'Task Reminder',
      },
    ],
  },
];
