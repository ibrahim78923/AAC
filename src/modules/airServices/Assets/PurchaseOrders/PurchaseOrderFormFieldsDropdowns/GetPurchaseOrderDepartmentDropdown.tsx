import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const GetPurchaseOrderDepartmentDropdown = () => {
  const apiQueryDepartment =
    useLazyGetAirServicesAssetsPurchaseOrderDepartmentDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="department"
        label="Department"
        size="small"
        apiQuery={apiQueryDepartment}
        placeholder="Select Department"
      />
    </>
  );
};

export default GetPurchaseOrderDepartmentDropdown;
