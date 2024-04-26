import { Cancel, CheckCircle } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const testingData = [
  {
    id: 93,
    heading: 'Testing',
    description: ['Since this is a test, no actions will be executed'],
  },
];
const moduleTitle: any = {
  DEALS: 'Deals',
  QUOTES: 'Quotes',
  SALES_TASK: 'Tasks',
};
export const WorkflowConditionData = (
  testWorkflowResponse: any,
  watch: any,
) => {
  const total = testWorkflowResponse?.data?.data?.meta?.total;
  const moduleSelectedOption = watch('module');
  const titleData = moduleTitle[moduleSelectedOption];
  let icon;
  let heading;
  let color;
  if (!total) {
    icon = Cancel;
    heading = `The matching condition is ${total ?? 0}`;
    color = 'error.main';
  } else {
    icon = CheckCircleIcon;
    heading = `The matching condition is ${total}`;
    color = 'success.main';
  }

  return [
    {
      _id: 453,
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
