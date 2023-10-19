import { PeopleAlt, Description } from '@mui/icons-material';

export const cardsData = [
  {
    icon: <Description sx={{ color: '#38CAB5' }} />,
    title: 'Invoices',
    description: 'Overview Invoices Reports',
    link: '/super-admin/reports/invoices-reports',
  },
  {
    title: 'Users',
    description: 'Overview Forecast Category Reports',
    link: '/super-admin/reports/users-reports',
    icon: <PeopleAlt sx={{ color: '#38CAB5' }} />,
  },
];
