import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

export const FilterArray = [
  {
    componentProps: {
      name: 'domainName',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'All Industries', label: 'All Industries' },
      { value: 'Computer Software', label: 'Computer Software' },
      { value: 'Construction', label: 'Construction' },
      { value: 'Electronics', label: 'Electronics' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Company Name',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'AirApple Cart', label: 'AirApple Cart' },
      { value: 'PhoenixBaker', label: 'PhoenixBaker' },
      { value: 'Foster App', label: 'Foster App' },
      { value: 'Share My Dine', label: 'Share My Dine' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyOwner',
      label: 'Company Owner',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Savannah Shane', label: 'Savannah Shane' },
      { value: 'April Cruitis', label: 'April Cruitis' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Brooklyn Simmons', label: 'Brooklyn Simmons' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'industry',
      label: 'Created Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
