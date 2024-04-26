import { RHFEditor, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addRequestApprovalValidationSchema = Yup?.object()?.shape({
  subject: Yup?.mixed()?.nullable()?.required('Required'),
  description: Yup?.string()?.required('Required'),
});

export const addRequestApprovalFormDefaultValues = {
  subject: null,
  description: '',
};

export const addRequestApprovalFormFieldsDynamic = (apiQueryApprover: any) => [
  {
    _id: 1,
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
  },
  {
    _id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
];
