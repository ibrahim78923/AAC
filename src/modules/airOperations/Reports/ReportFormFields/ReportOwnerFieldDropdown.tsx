import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetReportsOwnersDropdownListForReportsQuery } from '@/services/airOperations/reports';

export const ReportOwnerFieldDropdown = (props: any) => {
  const { required = true, label = 'Owner Name' } = props;
  const reportOwnerApiQuery =
    useLazyGetReportsOwnersDropdownListForReportsQuery?.();

  return (
    <RHFAutocompleteAsync
      name="owner"
      label={label}
      placeholder="Select report owner"
      fullWidth
      required={required}
      apiQuery={reportOwnerApiQuery}
      size="small"
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
