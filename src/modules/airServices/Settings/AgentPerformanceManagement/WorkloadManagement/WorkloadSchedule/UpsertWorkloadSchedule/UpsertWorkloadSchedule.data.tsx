import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const createScheduleDefaultValues = {
  name: '',
  description: '',
  businessHours: null,
  addUsers: null,
};

export const createScheduleSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  businessHours: Yup?.mixed()?.nullable(),
  addUsers: Yup?.mixed()?.nullable(),
});

const businessOptions = ['Business Hour 1', 'Business Hour 2'];
const userOption = ['BE1', 'BE2', 'BE3'];

export const createScheduleFields = [
  {
    id: 1,
    md: 7,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    md: 7,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: { height: 200 },
    },
    component: RHFEditor,
  },
  {
    id: 3,
    md: 8.4,
    componentProps: {
      name: 'businessHours',
      label: 'Business Hours',
      fullWidth: true,
      options: businessOptions,
    },
    iconProps: {
      color: 'primary',
    },
    textProps: {
      color: 'primary',
      variant: 'body3',
      whiteSpace: 'nowrap',
    },
    title: 'View Business Hours',
    component: RHFAutocomplete,
  },

  {
    id: 4,
    md: 7,
    componentProps: {
      name: 'addUsers',
      label: 'Add Users',
      fullWidth: true,
      options: userOption,
    },
    component: RHFAutocomplete,
  },
];
