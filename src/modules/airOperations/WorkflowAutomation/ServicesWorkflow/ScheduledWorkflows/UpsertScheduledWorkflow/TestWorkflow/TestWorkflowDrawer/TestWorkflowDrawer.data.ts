import { Cancel, CheckCircle } from '@mui/icons-material';

export const testingData = [
  {
    id: 93,
    heading: 'Testing',
    status: 'Test Different Deal',
    description: [
      'Since this is a test, no actions will be executed',
      'This Deal will enter the workflow depending on the trigger',
    ],
  },
];

export const WorkflowConditionData = [
  {
    id: 453,
    icon: Cancel,
    color: 'error.main',
    heading: 'Conditions  not met for testing',
    detail: [
      {
        id: 124,
        conditionNum: '1',
        boxColor: 'blue.main',
        statusColor: 'error.main',
        conditionDetail: 'Deal value is 2500',
        conditionStatus: 'Doesn’t Match',
      },
      {
        id: 568,
        conditionType: 'AND',
        conditionNum: '2',
        boxColor: 'blue.main',
        statusColor: 'success.main',
        conditionDetail: 'Deal value is less than 10',
        conditionStatus: 'Matches',
      },
    ],
  },
  {
    id: 879,
    icon: CheckCircle,
    color: 'secondary.main',
    heading: 'No actions will execute since conditions are not met',
    detail: [
      {
        id: 358,
        boxColor: 'custom.steel_blue_alpha',
        conditionNum: '1',
        conditionDetail: 'Update Deal',
        statusColor: 'custom.steel_blue',
        conditionStatus: 'Will Execute',
      },
    ],
  },
];
