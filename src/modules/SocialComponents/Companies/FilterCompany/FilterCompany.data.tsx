import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';

export const FilterArray = [
  {
    componentProps: {
      name: 'industry',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'computerSoftware', label: 'Computer software' },
      { value: 'computerServices', label: 'Computer Services' },
      { value: 'construction', label: 'Construction' },
      { value: 'none', label: 'None' },
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
      name: 'crn',
      label: 'Company Registration Number',
      fullWidth: true,
      select: true,
    },
    options: [
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
      name: 'ownerId',
      label: 'Company Owner',
      fullWidth: true,
      select: true,
    },
    options: [
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
      name: 'date',
      label: 'Created Date',
      fullWidth: true,
      placeholder: 'Created Date',
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];
