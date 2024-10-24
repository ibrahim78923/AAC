import * as Yup from 'yup';
import GetSoftwareUserContractDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareContractDropdown';
import GetSoftwareUserUsersDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareUserUsersDropdown';
export const addUserValidationSchema: any = Yup?.object()?.shape({
  user: Yup?.mixed()?.nullable()?.required('Required'),
  contract: Yup?.mixed()?.nullable(),
});
export const addUserDefaultValues = () => {
  return {
    user: null,
    contract: null,
  };
};

export const addUserData = () => [
  {
    id: 1,
    component: GetSoftwareUserUsersDropdown,
    md: 12,
  },
  {
    id: 2,
    component: GetSoftwareUserContractDropdown,
    md: 12,
  },
];
