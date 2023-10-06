import * as Yup from 'yup';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

//filter drwaer form
export const validationSchema = Yup.object().shape({
  userType: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  userType: '', //1
};

export const addUsersArray = [
  {
    componentProps: {
      name: 'userType',
      label: 'User Type',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanyOwner', label: 'Company Owner' },
      { value: 'SuperAdmin', label: 'Super Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
