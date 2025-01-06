import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetOperationsReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const ReportOwnerFieldDropdown = (props: any) => {
  const { required = true, label = 'Owner Name' } = props;
  const reportOwnerApiQuery =
    useLazyGetOperationsReportsOwnersDropdownListForReportsQuery?.();
  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);
  return (
    <RHFAutocompleteAsync
      name="owner"
      label={label}
      placeholder="Select report owner"
      fullWidth
      required={required}
      apiQuery={reportOwnerApiQuery}
      size="small"
      externalParams={{
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
