import { RHFSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  selectDeal: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  selectDeal: '',
};

export const formFields = [
  {
    md: 12,
    component: RHFSearchableSelect,
    componentProps: {
      name: 'selectDeal',
      label: 'Select Deal*',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
    },
  },
];
