import { RHFMultiSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addMembersValidationSchema = Yup?.object()?.shape({
  members: Yup?.string()?.required('Field is Required'),
});

export const addMembersDefaultValues = {
  members: '',
};

export const addMembersDataArray = (
  setIsAddMembers: any,
  transformedData: any,
) => {
  return [
    {
      componentProps: {
        name: 'members',
        label: 'Members',
        isCheckBox: true,
        defaultOpen: true,
        isFooter: true,
        footerText: 'Add',
        footerActionHandler: () => alert('Add'),
        setIsDropdownClose: setIsAddMembers,
      },
      options: transformedData,
      component: RHFMultiSearchableSelect,
      md: 12,
    },
  ];
};
