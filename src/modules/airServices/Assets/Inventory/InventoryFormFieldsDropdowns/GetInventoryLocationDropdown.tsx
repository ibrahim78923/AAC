import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsInventoryLocationsDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryLocationDropdown = ({ name }: any) => {
  const apiQueryLocationType =
    useLazyGetAirServicesAssetsInventoryLocationsDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name={name}
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
