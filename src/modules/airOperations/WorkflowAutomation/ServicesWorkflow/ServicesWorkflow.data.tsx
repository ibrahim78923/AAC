import EventBaseWorkflows from './EventBaseWorkflows';
import ScheduledWorkflows from './ScheduledWorkflows';
import SupervisorRules from './SupervisorRules';

export const serviceWorkflowsCardData = [
  {
    id: 1,
    title: 'Event Base Workflows',
    description:
      'An Event-Based Workflow is triggered when a record is added, changed, or removed in an Air Applecart services module like Tickets, Tasks, Assets, and Meetings',
    buttonTitle: 'Total work Flows: 3',
  },
  {
    id: 2,
    title: 'Scheduled Workflows',
    description:
      'Scheduled Workflows execute for all records in a specific module on a scheduled basis or in response to the set of conditions.',
    buttonTitle: 'Total work Flows: 3',
  },
  {
    id: 3,
    title: 'Supervisor Rules',
    description:
      'The Supervisor Rule takes specified actions on tickets based on time and event-driven triggers.',
    buttonTitle: 'Total work Flows: 3',
  },
];
export const cardRelatedData: any = {
  1: <EventBaseWorkflows />,
  2: <ScheduledWorkflows />,
  3: <SupervisorRules />,
};
