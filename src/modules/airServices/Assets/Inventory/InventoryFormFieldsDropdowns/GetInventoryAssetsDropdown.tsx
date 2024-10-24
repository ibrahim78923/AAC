import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssetsInventoryAssetTypeInventoryDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryAssetsDropdown = () => {
  const apiQueryAssetType =
    useLazyGetAirServicesAssetsInventoryAssetTypeInventoryDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="assetType"
        label="Asset Type"
        placeholder="All Assets"
        required
        size="small"
        apiQuery={apiQueryAssetType}
        externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
        fullWidth
      />
    </>
  );
};

export default GetInventoryAssetsDropdown;
