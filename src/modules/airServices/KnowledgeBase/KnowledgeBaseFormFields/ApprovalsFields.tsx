import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesKnowledgeBaseUsersDropdownListForArticlesApprovalsQuery } from '@/services/airServices/knowledge-base/articles';

export const ApprovalsFields = () => {
  const apiQueryApprover =
    useLazyGetServicesKnowledgeBaseUsersDropdownListForArticlesApprovalsQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name="approver"
      label="Approver"
      placeholder="Select an approver"
      size="small"
      fullWidth
      required
      sx={{ pb: 1.2 }}
      externalParams={{ admin: true, productId }}
      apiQuery={apiQueryApprover}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};

export default ApprovalsFields;
