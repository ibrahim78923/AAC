import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  description: Yup.string(),
  status: Yup.string(),
  type: Yup.string(),
  publisher: Yup.string(),
  managedBy: Yup.string(),
});
export const defaultValues = {
  name: '',
  description: '',
  status: '',
  type: '',
  publisher: '',
  managedBy: '',
};
export const softwareEditDrawerArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      select: false,
      required: true,
      value: 'Figma',
    },
    // inventry: 'hi',
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      multiline: true,
      minRows: 3,
      fullWidth: true,
      placeholder: 'Enter Descrption',
      label: 'Description',
    },
    md: 12,
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'managed',
        label: 'Managed',
      },
      {
        value: 'desktop',
        label: 'Desktop',
      },
      {
        value: 'saaS',
        label: 'Saas',
      },
      {
        value: 'mobile',
        label: 'Mobile',
      },
    ],

    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      {
        value: 'desktop',
        label: 'Desktop',
      },
      {
        value: 'restricted',
        label: 'Restricted',
      },
      {
        value: 'ignored',
        label: 'Ignored',
      },
      {
        value: 'managed',
        label: 'Managed',
      },
      {
        value: 'disable',
        label: 'Disable',
      },
      {
        value: 'inReview',
        label: 'InReview',
      },
    ],

    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'managedBy',
      label: 'Managed by',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
];
