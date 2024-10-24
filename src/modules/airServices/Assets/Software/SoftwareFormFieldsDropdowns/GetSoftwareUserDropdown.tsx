import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetUserDropdownQuery } from '@/services/airServices/assets/software';

const GetSoftwareUserDropdown = ({ productId }: any) => {
  const userQuery = useLazyGetUserDropdownQuery();
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
