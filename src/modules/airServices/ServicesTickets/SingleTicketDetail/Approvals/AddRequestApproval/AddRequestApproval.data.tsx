import { RHFEditor, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addRequestApprovalValidationSchema = Yup?.object()?.shape({
  subject: Yup?.mixed()?.nullable()?.required('Required'),
  description: Yup?.string()?.required('Required'),
});

export const defaultValues = {
  subject: null,
  description: '',
};

export const addRequestApprovalFormFieldsDynamic = (apiQueryApprover: any) => [
  {
    componentProps: {
      name: 'subject',
      label: 'To',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryApprover,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
    md: 12,
  },
];
