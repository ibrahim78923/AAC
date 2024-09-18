import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';

export const ReportOwnerFieldDropdown = () => {
  const reportOwnerApiQuery =
    useLazyGetReportsOwnersDropdownListForReportsQuery?.();

  return (
    <RHFAutocompleteAsync
      label="Owner Name"
      name="owner"
      fullWidth
      required
      apiQuery={reportOwnerApiQuery}
      size="small"
      placeholder="Choose Owner"
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
