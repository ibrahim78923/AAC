import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsPurchaseOrderLocationsDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderLocationDropdown = () => {
  const apiQueryLocations =
    useLazyGetAirServicesAssetsPurchaseOrderLocationsDropdownQuery();

  return (
    <>
      <RHFAutocompleteAsync
        name={'location'}
        label={'Location'}
        size={'small'}
        apiQuery={apiQueryLocations}
        placeholder={'Select Location'}
        getOptionLabel={(option: any) => option?.locationName}
      />
    </>
  );
};

export default GetPurchaseOrderLocationDropdown;
