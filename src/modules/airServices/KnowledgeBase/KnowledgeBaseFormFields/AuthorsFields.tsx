import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';

export const AuthorsFields = () => {
  const apiQueryAuthor =
    useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery();

  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name="authorId"
      label="Author"
      placeholder="Select an author"
      size="small"
      fullWidth
      externalParams={{ admin: true, productId }}
      apiQuery={apiQueryAuthor}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};

export default AuthorsFields;
