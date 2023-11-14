import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

export const FilterArray = [
  {
    componentProps: {
      name: 'domainName',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
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
