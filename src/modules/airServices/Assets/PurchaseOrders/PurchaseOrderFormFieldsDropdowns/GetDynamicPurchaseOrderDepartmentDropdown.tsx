import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetDynamicPurchaseOrderDepartmentDropdown = (props: any) => {
  const { name, index } = props;
  const apiQueryDepartment =
    useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={`${name}.${index}.department`}
      size={'small'}
      apiQuery={apiQueryDepartment}
      placeholder={'Select Department'}
      sx={{ minWidth: '5rem' }}
    />
  );
};

export default GetDynamicPurchaseOrderDepartmentDropdown;
