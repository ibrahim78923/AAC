import * as Yup from 'yup';
import GetSoftwareUserContractDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareContractDropdown';
import GetSoftwareUserUsersDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareUserUsersDropdown';

export const addUserValidationSchema: any = Yup?.object()?.shape({
  user: Yup?.mixed()?.nullable()?.required('User is required'),
  contract: Yup?.mixed()?.nullable(),
});

export const addUserDefaultValues = () => {
  return {
    user: null,
    contract: null,
  };
};

export const addUserFormFieldsDynamic = () => [
  {
    _id: 1,
    component: GetSoftwareUserUsersDropdown,
  },
  {
    _id: 2,
    component: GetSoftwareUserContractDropdown,
  },
];
