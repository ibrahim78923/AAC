import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderDepartmentDropdown = (props: any) => {
  const { name = 'department' } = props;

  const apiQueryDepartment =
    useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={name}
      label={'Department'}
      size={'small'}
      apiQuery={apiQueryDepartment}
      placeholder={'Select Department'}
    />
  );
};

export default GetPurchaseOrderDepartmentDropdown;
