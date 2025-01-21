import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUserDropdownQuery } from '@/services/airServices/assets/software';

const GetSoftwareUserDropdown = () => {
  const userQuery = useLazyGetUserDropdownQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  return (
    <>
      <RHFAutocompleteAsync
        name="managedBy"
        label="Managed By"
        placeholder="Select User"
        fullWidth
        apiQuery={userQuery}
        externalParams={{ productId }}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
        size="small"
      />
    </>
  );
};

export default GetSoftwareUserDropdown;
