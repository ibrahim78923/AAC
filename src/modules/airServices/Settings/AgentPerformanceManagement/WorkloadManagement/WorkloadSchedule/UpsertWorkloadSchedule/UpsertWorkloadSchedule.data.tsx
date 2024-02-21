import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertWorkloadScheduleDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    businessHoursId: data?.businessHoursDetails ?? null,
    agentsId: data?.agentDetails ?? null,
  };
};

export const upsertWorkloadScheduleValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  businessHoursId: Yup?.mixed()?.nullable(),
  agentsId: Yup?.mixed()?.nullable(),
});

const businessOptions = [
  { _id: 'Business Hour 1', label: 'Business Hour 1' },
  { _id: 'Business Hour 2', label: 'Business Hour 2' },
];
const userOption = [
  { _id: 'BE 1', label: 'BE 1' },
  { _id: 'BE 2', label: 'BE 2' },
  { _id: 'BE 3', label: 'BE 3' },
];

export const upsertWorkloadScheduleFormFieldsDynamic = () => [
  {
    _id: 1,
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
    _id: 2,
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
    _id: 3,
    md: 8.4,
    componentProps: {
      name: 'businessHoursId',
      label: 'Business Hours',
      fullWidth: true,
      options: businessOptions,
      getOptionLabel: (option: any) => option?.label,
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
    _id: 4,
    md: 7,
    componentProps: {
      name: 'agentsId',
      label: 'Add Users',
      fullWidth: true,
      options: userOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
