import PersonIcon from '@mui/icons-material/Person';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
export const departments = [
  {
    title: 'AllDepartments',
  },
  {
    title: 'IT',
  },
  {
    title: 'HR',
  },
  {
    title: 'Finance',
  },
];
export const availabilityHeader = (theme: any) => [
  {
    title: 'Total Agents',
    icon: <PersonIcon style={{ color: theme?.palette?.custom?.main }} />,
    titleNumber: '15',
  },
  {
    title: 'Available',
    icon: (
      <CheckCircleRoundedIcon
        style={{ color: theme?.palette?.success?.main }}
      />
    ),
    titleNumber: '12',
  },
  {
    title: 'Not Available',
    icon: (
      <QueryBuilderRoundedIcon
        style={{ color: theme?.palette?.warning?.main }}
      />
    ),
    titleNumber: '3',
  },
];
export const pieChartData: any = {
  data: [44, 55],
};

export const pieChartDataOptions = (theme: any) => ({
  colors: [theme?.palette?.success?.main, theme?.palette?.warning?.main],
});
