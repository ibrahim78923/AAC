import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const selectTagsOptions = [
  {
    value: '1',
    label: 'john ',
  },
  {
    value: '2',
    label: 'Alex',
  },
  {
    value: '3',
    label: 'Mino',
  },
];
export const addTeamsValidationSchema = Yup.object().shape({
  TeamName: Yup.string().trim().required('Field is Required'),

  teamAgent: Yup.array()
    .of(Yup.string())
    .required('Field is Required')
    .min(1, 'At least one item is required'),
});

export const addTeamsDefaultValues = {
  TeamName: '',
  teamAgent: [],
};

export const addTeamsFields = [
  {
    id: 'TeamName',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'TeamName',
      label: 'Team Name',
      placeholder: 'Enter Team name',
      required: true,
    },
  },
  {
    id: 2,
    componentProps: {
      name: 'teamAgent',
      GridView: 6,
      label: 'Team Members',
      isCheckBox: true,
      isSearch: false,
      options: selectTagsOptions,
      fullWidth: true,
    },

    component: RHFMultiCheckbox,
    md: 12,
  },
];
