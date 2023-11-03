import PersonIcon from '@mui/icons-material/Person';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
export const actionsFunction = [
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
export const availabilityHeader = [
  {
    title: 'Total Agents',
    icon: <PersonIcon style={{ color: '#6B7280' }} />,
    titlenumber: '15',
  },
  {
    title: 'Available',
    icon: <CheckCircleRoundedIcon style={{ color: '#47B263' }} />,
    titlenumber: '12',
  },
  {
    title: 'Not Available',
    icon: <QueryBuilderRoundedIcon style={{ color: '#FFC20E' }} />,
    titlenumber: '3',
  },
];
