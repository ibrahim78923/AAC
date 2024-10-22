import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderVendorDropdown = (props: any) => {
  const { name = 'vendor' } = props;

  const apiQueryVendor: any =
    useLazyGetAirServicesAssetsPurchaseOrderVendorDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={name}
      label={'Vendor'}
      placeholder={'Select Vendor'}
      size={'small'}
      apiQuery={apiQueryVendor}
      externalParams={{
        meta: true,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
      required
    />
  );
};

export default GetPurchaseOrderVendorDropdown;
