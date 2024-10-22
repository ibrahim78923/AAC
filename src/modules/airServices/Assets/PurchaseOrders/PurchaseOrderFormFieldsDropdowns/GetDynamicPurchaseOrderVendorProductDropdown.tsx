import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { AIR_SERVICES } from '@/constants';
import { useLazyGetAirServicesAssetsPurchaseOrderVendorProductsDropdownQuery } from '@/services/airServices/assets/purchase-orders';
import Link from 'next/link';

const GetPurchaseOrderVendorProductDropdown = (props: any) => {
  const { index, vendorId } = props;

  const apiQueryVendorProduct: any =
    useLazyGetAirServicesAssetsPurchaseOrderVendorProductsDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={`purchaseDetails.${index}.itemName`}
      size={'small'}
      placeholder={'Select Item'}
      sx={{ minWidth: '12rem' }}
      getOptionLabel={(option: any) =>
        option?.vendorproductcatalogsDetails?.name
      }
      apiQuery={apiQueryVendorProduct}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        vendorId: vendorId,
      }}
      noOptionsCase={
        <Link
          href={{
            pathname: AIR_SERVICES?.VENDOR_DETAIL,
            query: { vendorId },
          }}
        >
          Please Add Products First
        </Link>
      }
    />
  );
};

export default GetPurchaseOrderVendorProductDropdown;
