import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsInventoryDepartmentDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryDepartmentDropdown = () => {
  const apiQueryDepartmentType =
    useLazyGetAirServicesAssetsInventoryDepartmentDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="department"
        label="Department"
        placeholder="Select Department"
        apiQuery={apiQueryDepartmentType}
        fullWidth
        size="small"
      />
    </>
  );
};

export default GetInventoryDepartmentDropdown;
