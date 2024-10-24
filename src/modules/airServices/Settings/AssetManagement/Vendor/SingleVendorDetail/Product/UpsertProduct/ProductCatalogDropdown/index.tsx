import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetProductVendorDropdownQuery } from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/product';

export const ProductCatalogDropdown = (props: any) => {
  const apiQueryProductCatalog = useLazyGetProductVendorDropdownQuery();
  return (
    <RHFAutocompleteAsync
      name="productCatalog"
      label="Product Catalog"
      type="text"
      size="small"
      required
      placeholder="---Choose---"
      apiQuery={apiQueryProductCatalog}
      externalParams={{ meta: false }}
      getOptionLabel={(option: any) => option?.name}
      {...props}
    />
  );
};
