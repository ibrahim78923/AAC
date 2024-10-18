import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetVendorsCatalogQuery } from '@/services/airServices/settings/asset-management/product-catalog';

export const VendorCatalogDropdown = (props: { [key: string]: string }) => {
  const apiQueryVendorsList = useLazyGetVendorsCatalogQuery();
  return (
    <RHFAutocompleteAsync
      name="vendorCatalog"
      label="Vendor Catalog"
      required
      placeholder="---Choose---"
      apiQuery={apiQueryVendorsList}
      externalParams={{ meta: false, limit: 50 }}
      {...props}
    />
  );
};
