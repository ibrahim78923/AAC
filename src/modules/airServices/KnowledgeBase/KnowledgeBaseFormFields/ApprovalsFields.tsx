import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServicesKnowledgeBaseUsersDropdownListForArticlesApprovalsQuery } from '@/services/airServices/knowledge-base/articles';

export const ApprovalsFields = () => {
  const apiQueryApprover =
    useLazyGetServicesKnowledgeBaseUsersDropdownListForArticlesApprovalsQuery();

  return (
    <RHFAutocompleteAsync
      name="approver"
      label="Approver"
      placeholder="Select an approver"
      size="small"
      fullWidth
      required
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
