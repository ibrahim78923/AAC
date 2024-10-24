import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesSettingsServicesAssetsCategoryDropdownQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetAssetsCategoriesListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiAssetCategoryQuery =
    useLazyGetAirServicesSettingsServicesAssetsCategoryDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name="assetType"
      label="Select assets categories"
      placeholder="Choose assets"
      fullWidth
      size="small"
      required
      disabled={disabled}
      apiQuery={apiAssetCategoryQuery}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT, meta: true }}
    />
  );
};
