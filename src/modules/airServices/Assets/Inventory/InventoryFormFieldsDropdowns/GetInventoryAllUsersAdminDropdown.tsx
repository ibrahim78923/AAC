import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesAssetsInventoryUsersDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryAllUsersAdminDropdown = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
  const apiQueryUsersCreatedBy =
    useLazyGetAirServicesAssetsInventoryUsersDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="createdBy"
        label="Created By"
        size="small"
        apiQuery={apiQueryUsersCreatedBy}
        placeholder="Select user"
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
        externalParams={{ productId, admin: true }}
      />
    </>
  );
};

export default GetInventoryAllUsersAdminDropdown;
