import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const teamsValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  userAccounts: Yup.string().required('Field is Required'),
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
      label: 'Team Members',
      fullWidth: true,
      select: true,
    },
    options: productsUsers?.data?.usercompanyaccounts?.map((item: any) => ({
      value: item?._id,
      label: `${item?.user?.firstName} ${item?.user?.lastName}`,
    })),
    component: RHFSelect,
    md: 12,
  },
];
