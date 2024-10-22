import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsInventoryLocationsDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryLocationDropdown = () => {
  const apiQueryLocationType =
    useLazyGetAirServicesAssetsInventoryLocationsDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="location"
        label="Location"
        placeholder="Select Location"
        apiQuery={apiQueryLocationType}
        getOptionLabel={(option: any) => option?.locationName}
        fullWidth
        size="small"
      />
    </>
  );
};

export default GetInventoryLocationDropdown;
