import { RHFRadioGroup, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({});

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
      defaultValue: '',
      options: [
        {
          value: 'useDefault',
          label: 'Use Default',
        },
        {
          value: 'customizeFromAddress',
          label: 'Customize from address',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
