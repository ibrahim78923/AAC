import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { UsersDropdownOptionsI } from '../Filter/Filter.interface';
import { useLazyGetImportUsersDropdownListQuery } from '@/services/airOperations/data-management/import';

export const UsersListDropdown = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id;
  const usersDropdown = useLazyGetImportUsersDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      size="small"
      name="user"
      label="User"
      placeholder="User"
      fullWidth={true}
      apiQuery={usersDropdown}
      getOptionLabel={(option: UsersDropdownOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
      externalParams={{
        productId: productId,
      }}
    />
  );
};
