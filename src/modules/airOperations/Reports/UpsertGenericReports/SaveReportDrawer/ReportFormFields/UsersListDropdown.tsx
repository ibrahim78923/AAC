import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { UsersDropdownOptionsI } from '../SaveReportDrawer.interface';
import { useLazyUsersDropdownQuery } from '@/services/airOperations/reports/upsert-generic-reports';
import { useMemo } from 'react';
import { getActiveProductSession } from '@/utils';
import { useRouter } from 'next/router';

export const UsersListDropdown = (props: any) => {
  const { name, hasCurrentProduct = true } = props;
  const router = useRouter();

  const selectedProductId = router?.query?.id;

  const currentProductId = useMemo(() => {
    const product = getActiveProductSession();
    return product?._id;
  }, []);

  const productId = hasCurrentProduct ? currentProductId : selectedProductId;

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
        admin: true,
      }}
    />
  );
};
