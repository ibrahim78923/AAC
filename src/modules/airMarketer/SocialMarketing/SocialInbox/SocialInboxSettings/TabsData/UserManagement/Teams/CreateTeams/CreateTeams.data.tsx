import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import { capitalizeFirstLetter } from '@/utils/api';
import * as Yup from 'yup';

export const teamsValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  userAccounts: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one member is required')
    .required('Members are Required'),
});

export const teamsDefaultValues: any = {
  name: '',
  userAccounts: [],
};

export const teamsDataArray: any = (filterdTeamMembers: any) => [
  {
    componentProps: {
      name: 'name',
      label: 'Team Name',
      fullWidth: true,
      placeholder: 'Enter Team Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'userAccounts',
      GridView: 6,
      label: 'Team Members',
      required: true,
      options: filterdTeamMembers?.map((item: any) => ({
        value: item?._id,
        label: capitalizeFirstLetter(item?.username) ?? 'N/A',
      })),
    },
    component: RHFMultiCheckbox,
    md: 12,
  },
];
