import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesAssetsInventoryUsersDropdownQuery } from '@/services/airServices/assets/inventory';

const GetInventoryAllUsersDropdown = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  const apiQueryUsedByType =
    useLazyGetAirServicesAssetsInventoryUsersDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="usedBy"
        label="Used By"
        placeholder="Name"
        apiQuery={apiQueryUsedByType}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
        externalParams={{ productId, requester: true, admin: true }}
        fullWidth
        size="small"
      />
    </>
  );
};

export default GetInventoryAllUsersDropdown;
