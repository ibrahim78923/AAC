import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssetsInventoryAssetTypeInventoryDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryAssetsDropdown = (props: any) => {
  const apiQueryAssetType =
    useLazyGetAirServicesAssetsInventoryAssetTypeInventoryDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="assetType"
        label="Asset Type"
        placeholder="All Assets"
        size="small"
        apiQuery={apiQueryAssetType}
        externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
        fullWidth
        {...props}
      />
    </>
  );
};

export default GetInventoryAssetsDropdown;
