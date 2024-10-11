import {
  AccessTimeFilled,
  CheckCircleRounded,
  Person,
} from '@mui/icons-material';

export const agentAvailabilityCountDynamic = (pieCharts: any) => [
  {
    title: 'Total Agents',
    icon: <Person color="secondary" />,
    count: pieCharts?.total,
  },
  {
    title: 'Available',
    icon: <CheckCircleRounded color="success" />,
    count: pieCharts?.availableAgents,
  },
  {
    title: 'Not Available',
    icon: <AccessTimeFilled color="warning" />,
    count: pieCharts?.unAvailableAgents,
  },
];
