import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const statusOptions = [
  { value: 'Restricted', label: 'Restricted' },
  { value: 'Ignored', label: 'Ignored' },
  { value: 'Managed', label: 'Managed' },
  { value: 'Disabled', label: 'Disabled' },
  { value: 'In Review', label: 'In Review' },
];
const typeOptions = [
  { value: 'Desktop', label: 'Desktop' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Mobile', label: 'Mobile' },
];

export const upsertSoftwareFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  description: Yup.string(),
  status: Yup.string(),
  type: Yup.string().required('Field is Required'),
  publisher: Yup.string(),
  category: Yup.string(),
  managedBy: Yup.string(),
});

export const upsertSoftwareFormDefaultValues = {
  name: '', //1
  description: '', //2
  status: '', //3
  type: '', //4
  publisher: '', //5
  category: '', //6
  managedBy: '', //7
};

export const upsertSoftwareFormFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: statusOptions,
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
    options: typeOptions,
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
