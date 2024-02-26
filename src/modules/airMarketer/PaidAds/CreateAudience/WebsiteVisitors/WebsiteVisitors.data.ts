import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  lastVisited: '90 days',
};

export const websiteVIisitorsData = [
  {
    componentProps: {
      label: 'Source Pixel',
      name: 'sourcePixel',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'peopleVisited',
      label: 'People Visited',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastVisited',
      label: 'Visited in the last',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
