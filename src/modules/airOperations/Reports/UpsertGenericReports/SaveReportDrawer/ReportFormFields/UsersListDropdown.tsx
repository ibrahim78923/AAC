import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { UsersDropdownOptionsI } from '../SaveReportDrawer.interface';
import { useLazyUsersDropdownQuery } from '@/services/airOperations/reports/upsert-generic-reports';
import useAuth from '@/hooks/useAuth';

export const UsersListDropdown = (props: any) => {
  const { name } = props;
  const auth: any = useAuth();
  const productId = auth?.product?._id;
  const usersDropdown = useLazyUsersDropdownQuery();

  return (
    <RHFAutocompleteAsync
      size="small"
      name={name}
      label="Select user"
      multiple={true}
      required={true}
      apiQuery={usersDropdown}
      getOptionLabel={(option: UsersDropdownOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Select Option"
      externalParams={{
        productId: productId,
      }}
    />
  );
};
