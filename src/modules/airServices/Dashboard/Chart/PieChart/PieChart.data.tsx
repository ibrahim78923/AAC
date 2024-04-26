import PersonIcon from '@mui/icons-material/Person';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const pieChartData: any = {
  data: [44, 55],
};

const pieChartDataOptions = (theme: any) => ({
  colors: [theme?.palette?.success?.main, theme?.palette?.warning?.main],
});

export { pieChartData, pieChartDataOptions };
export const pieChartHeader = (theme: any, pieCharts: any) => [
  {
    title: 'Total Agents',
    icon: <PersonIcon style={{ color: theme?.palette?.custom?.main }} />,
    titleNumber: pieCharts?.total,
  },
  {
    title: 'Available',
    icon: (
      <CheckCircleRoundedIcon
        style={{ color: theme?.palette?.success?.main }}
      />
    ),
    titleNumber: pieCharts?.availableAgents,
  },
  {
    title: 'Not Available',
    icon: (
      <AccessTimeFilledIcon style={{ color: theme?.palette?.warning?.main }} />
    ),
    titleNumber: pieCharts?.unAvailableAgents,
  },
];
