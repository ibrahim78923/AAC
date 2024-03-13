import PersonIcon from '@mui/icons-material/Person';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
export const dropDownMenus = [
  {
    id: 1,
    title: 'AllDepartments',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'IT',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 3,
    title: 'HR',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 4,
    title: 'Finance',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
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
