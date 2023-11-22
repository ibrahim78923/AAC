import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  name: '',
};

export const websiteVIisitorsData = [
  {
    title: 'Name',
    componentProps: {
      label: 'Source Pixel',
      name: 'name',
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
    title: 'Name',
    componentProps: {
      name: 'name',
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
    title: 'Name',
    componentProps: {
      name: 'name',
      label: 'Visited in the last',
      fullWidth: true,
      select: true,
      disabled: true,
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
    title: 'Name',
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
