import PersonIcon from '@mui/icons-material/Person';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
export const dropDownMenus = [
  {
    title: 'AllDepartments',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'IT',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'HR',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Finance',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
export const pieChartHeader = (theme: any) => [
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
      <AccessTimeFilledIcon style={{ color: theme?.palette?.warning?.main }} />
    ),
    titleNumber: '3',
  },
];
