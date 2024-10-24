import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetUsersDropdownListForDepartmentMembersQuery } from '@/services/airServices/settings/user-management/departments';

export const MembersListDropdown = () => {
  const memberApiQuery = useLazyGetUsersDropdownListForDepartmentMembersQuery();

  return (
    <RHFAutocompleteAsync
      size="small"
      name="membersListDetails"
      label="Members"
      multiple={true}
      fullWidth={true}
      apiQuery={memberApiQuery}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Select"
    />
  );
};
