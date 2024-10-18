import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesSettingsServicesProductCatalogDropdownListQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetProductCatalogListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiProductCatalogQuery =
    useLazyGetAirServicesSettingsServicesProductCatalogDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      name="product"
      label="Select product"
      placeholder="Choose product"
      fullWidth
      size="small"
      required
      disabled={disabled}
      apiQuery={apiProductCatalogQuery}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT, meta: true }}
    />
  );
};
