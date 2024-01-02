import { RHFRadioGroup } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  signature: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  signature: '',
};

export const signatureFields = [
  {
    md: 12,
    component: RHFRadioGroup,
    componentProps: {
      name: 'signature',
      fullWidth: true,
      options: [
        { value: 'noSignature', label: 'No Signature' },
        {
          value: 'includeSignature',
          label: 'Include Space for a written signature',
        },
      ],
      row: false,
    },
  },
];
