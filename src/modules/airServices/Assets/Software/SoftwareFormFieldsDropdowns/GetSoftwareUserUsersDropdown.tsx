import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

const GetSoftwareUserUsersDropdown: React.FC = () => {
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  const userDropdown = useLazyGetUsersDropdownListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="user"
        label="User"
        fullWidth
        size="small"
        placeholder="Select User"
        apiQuery={userDropdown}
        externalParams={{ productId }}
        required
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
      />
    </>
  );
};

export default GetSoftwareUserUsersDropdown;
