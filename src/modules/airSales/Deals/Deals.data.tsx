import ActivityLog from './ViewDetails/ActivityLog';
import Details from './ViewDetails/Details';
import Tasks from './ViewDetails/Tasks';

export const tabsData = [
  { label: 'Details', content: <Details /> },
  { label: 'Activity Log', content: <ActivityLog /> },
  { label: 'Associations', content: 'Content for Associations' },
  { label: 'Tasks', content: <Tasks /> },
  { label: 'Notes', content: 'Content for Item Three' },
  { label: 'Calls', content: 'Content for Item Three' },
  { label: 'Meetings', content: 'Content for Item Three' },
  { label: 'Emails', content: 'Content for Item Three' },
];
