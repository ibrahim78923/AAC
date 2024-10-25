import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsInventoryDepartmentDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryDepartmentDropdown = ({ name }: any) => {
  const apiQueryDepartmentType =
    useLazyGetAirServicesAssetsInventoryDepartmentDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name={name}
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
