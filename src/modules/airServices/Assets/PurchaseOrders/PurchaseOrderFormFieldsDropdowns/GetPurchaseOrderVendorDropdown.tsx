import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderVendorDropdown = (props: any) => {
  const { name = 'vendor', required = true } = props;

  const apiQueryVendor: any =
    useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={name}
      label={'Vendor'}
      placeholder={'Select Vendor'}
      size={'small'}
      required={required}
      apiQuery={apiQueryVendor}
      externalParams={{
        meta: true,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
    />
  );
};

export default GetPurchaseOrderVendorDropdown;
