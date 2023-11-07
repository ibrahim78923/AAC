import { BarChart } from '../BarChart';
import { RadialBarChart } from '../../RadialBarChart';

export const actionsFunction = [
  {
    title: 'Priority',
    component: <RadialBarChart />,
  },
  {
    title: 'Status',
    component: <BarChart />,
  },
];
