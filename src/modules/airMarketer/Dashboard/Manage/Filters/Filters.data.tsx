import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  requester: Yup?.string()?.required('Field is Required'),
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string(),
  category: Yup?.string(),
  status: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  department: Yup?.string(),
  source: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string(),
  attachFile: Yup?.mixed(),
});

export const defaultValues = {
  requester: '',
  subject: '',
  description: '',
  category: '',
  status: '',
  priority: '',
  department: '',
  source: '',
  impact: '',
  agent: '',
  plannedStartDate: new Date(),
  plannedStartTime: new Date(),
  plannedEndDate: new Date(),
  plannedEndTime: new Date(),
  plannedEffort: '',
  attachFile: null,
};

export const dataArray = [
  {
    componentProps: {
      name: 'dashboardName',
      label: 'Dashboard Name',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Sales_1', label: 'Sales_1' },
      { value: 'Sales_2', label: 'Sales_2' },
      { value: 'Sales_3', label: 'Sales_3' },
      { value: 'Sales_4', label: 'Sales_4' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'owner',
      label: 'Owner',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'oliviaRhye', label: 'Olivia Rhye' },
      { value: 'oliviaRhye', label: 'Olivia Rhye' },
      { value: 'oliviaRhye', label: 'Olivia Rhye' },
      { value: 'oliviaRhye', label: 'Olivia Rhye' },
      { value: 'oliviaRhye', label: 'Olivia Rhye' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'Access Rights',
      label: 'Plan Type',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'privateToOwner', label: 'Private to owner' },
      { value: 'everyone', label: 'Everyone(View and edit)' },
      { value: 'everyone(view)', label: 'Everyone(View)' },
      { value: 'specialUser', label: 'Special User' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
