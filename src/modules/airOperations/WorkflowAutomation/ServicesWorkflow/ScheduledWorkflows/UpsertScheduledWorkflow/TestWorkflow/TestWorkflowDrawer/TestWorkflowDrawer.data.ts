import { SCHEMA_KEYS } from '@/constants/strings';
import { Cancel, CheckCircle } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const testingData = [
  {
    id: 93,
    heading: 'Testing',
    description: ['Since this is a test, no actions will be executed'],
  },
];

export const WorkflowConditionData = (
  testWorkflowResponse: any,
  watch: any,
) => {
  const total = testWorkflowResponse?.data?.meta?.total;
  const moduleSelectedOption = watch('module');
  const titleData =
    moduleSelectedOption === SCHEMA_KEYS?.TICKETS
      ? 'Ticket'
      : moduleSelectedOption === SCHEMA_KEYS?.TICKETS
        ? 'Assets'
        : 'Task';

  let icon;
  let heading;
  let color;

  if (total === 0) {
    icon = Cancel;
    heading = `The matching condition is ${total}`;
    color = 'error.main';
  } else {
    icon = CheckCircleIcon;
    heading = `The matching condition is ${total}`;
    color = 'success.main';
  }

  return [
    {
      id: 453,
      icon: icon,
      color: color,
      heading: heading,
    },
    {
      id: 879,
      icon: CheckCircle,
      color: 'secondary.main',
      heading: 'No actions will execute since conditions are not met',
      detail: [
        {
          _id: 358,
          boxColor: 'custom.steel_blue_alpha',
          conditionNum: '1',
          conditionDetail: titleData,
          statusColor: 'custom.steel_blue',
          conditionStatus: 'Will Execute',
        },
      ],
    },
  ];
};
