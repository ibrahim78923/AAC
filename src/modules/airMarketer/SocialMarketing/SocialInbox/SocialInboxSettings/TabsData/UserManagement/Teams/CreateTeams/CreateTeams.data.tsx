import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const teamsValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  userAccounts: Yup.array()
    .of(Yup.string()) // Assuming userAccounts is an array of strings
    .min(1, 'At least one member is required') // Validate that at least one member is present
    .required('Members are Required'), // Validate that the userAccounts array itself is required
});

export const teamsDefaultValues: any = {
  name: '',
  userAccounts: [],
};

export const teamsDataArray: any = (productsUsers: any) => [
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
      isCheckBox: true,
      label: 'Team Members',
      required: true,
      options: productsUsers?.map((item: any) => ({
        value: item?._id,
        label: `${item?.user?.firstName} ${item?.user?.lastName}`,
      })),
      fullWidth: true,
    },
    component: RHFMultiCheckbox,
    md: 12,
  },
];
