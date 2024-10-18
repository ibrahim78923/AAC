import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAssetTypeProductCatalogQuery } from '@/services/airServices/settings/asset-management/product-catalog';

export const AssetTypeDropdown = (props: { [key: string]: string }) => {
  const apiQueryAssetType = useLazyGetAssetTypeProductCatalogQuery();
  return (
    <RHFAutocompleteAsync
      name="assetType"
      label="Asset Type"
      fullWidth
      required
      apiQuery={apiQueryAssetType}
      externalParams={{ meta: false, limit: 50 }}
      {...props}
    />
  );
};
