import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetDepartmentDropdownListForAgentsQuery } from '@/services/airServices/settings/user-management/agents';

export const DepartmentListDropdown = () => {
  const departmentDropdown = useLazyGetDepartmentDropdownListForAgentsQuery();

  return (
    <RHFAutocompleteAsync
      size="small"
      name="departmentId"
      label="Department"
      placeholder="Select Department"
      fullWidth={true}
      apiQuery={departmentDropdown}
    />
  );
};
