import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderVendorDropdown = () => {
  const apiQueryVendor: any =
    useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="vendor"
        label="Vendor"
        placeholder="Select Vendor"
        size="small"
        apiQuery={apiQueryVendor}
        externalParams={{
          meta: false,
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        }}
        required
      />
    </>
  );
};

export default GetPurchaseOrderVendorDropdown;
