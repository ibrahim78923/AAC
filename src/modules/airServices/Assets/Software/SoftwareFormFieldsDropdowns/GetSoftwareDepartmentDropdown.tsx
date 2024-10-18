import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/assets/software/single-software-detail/users';

const GetSoftwareDepartmentDropdown: React.FC = () => {
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="department"
        label="Department"
        fullWidth
        size="small"
        placeholder="Select Department"
        apiQuery={apiQueryDepartment}
      />
    </>
  );
};

export default GetSoftwareDepartmentDropdown;
