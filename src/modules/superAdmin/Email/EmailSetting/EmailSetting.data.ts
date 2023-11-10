import { RHFRadioGroup, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fromName: Yup.string().trim().required('Field is Required'),
  fromAddress: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  fromName: '',
  fromAddress: '',
};

export const dataArray = [
  {
    label: 'From Name',
    componentProps: {
      name: 'fromName',
      fullWidth: true,
      select: true,
    },
    options: [],
    component: RHFSelect,
    md: 12,
  },
  {
    label: 'From Address',
    componentProps: {
      name: 'fromAddress',
      fullWidth: true,
      options: ['Use default', 'Customize from address'],
      row: true,
      sx: { marginLeft: 0 },
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
