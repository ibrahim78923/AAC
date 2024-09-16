import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetUsersDropdownListForArticlesApprovalsQuery } from '@/services/airServices/knowledge-base/articles';

export const ApprovalsFields = () => {
  const apiQueryApprover =
    useLazyGetUsersDropdownListForArticlesApprovalsQuery();

  return (
    <RHFAutocompleteAsync
      fullWidth
      name="approver"
      label="Approver"
      required
      size="small"
      placeholder="Select an approver"
      sx={{ pb: 1.2 }}
      externalParams={{ admin: true }}
      apiQuery={apiQueryApprover}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};

export default ApprovalsFields;
