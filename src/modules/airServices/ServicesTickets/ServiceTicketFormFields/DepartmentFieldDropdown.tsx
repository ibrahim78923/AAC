import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetDepartmentDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';

export const DepartmentFieldDropdown = (props: any) => {
  const { required = false } = props;
  const apiQueryDepartment =
    useLazyGetDepartmentDropdownForServicesTicketsQuery();

  return (
    <RHFAutocompleteAsync
      name="department"
      label="Department"
      placeholder="Choose Department"
      fullWidth
      size="small"
      required={required}
      apiQuery={apiQueryDepartment}
    />
  );
};
