import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { UsersDropdownOptionsI } from '../Filter/Filter.interface';
import { useLazyGetExportUsersDropdownListQuery } from '@/services/airOperations/data-management/export';

export const UsersListDropdown = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id;
  const usersDropdown = useLazyGetExportUsersDropdownListQuery();

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
