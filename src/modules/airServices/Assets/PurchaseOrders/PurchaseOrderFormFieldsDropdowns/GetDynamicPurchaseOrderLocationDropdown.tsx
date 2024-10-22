import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsPurchaseOrderLocationsDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetDynamicPurchaseOrderLocationDropdown = (props: any) => {
  const { name, index } = props;
  const apiQueryLocations =
    useLazyGetAirServicesAssetsPurchaseOrderLocationsDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={`${name}.${index}.location`}
      size={'small'}
      apiQuery={apiQueryLocations}
      placeholder={'Select Location'}
      getOptionLabel={(option: any) => option?.locationName}
      sx={{ minWidth: '5rem' }}
    />
  );
};

export default GetDynamicPurchaseOrderLocationDropdown;
