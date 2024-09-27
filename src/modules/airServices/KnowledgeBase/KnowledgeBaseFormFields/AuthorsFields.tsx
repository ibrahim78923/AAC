import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';

export const AuthorsFields = () => {
  const apiQueryAuthor =
    useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery();

  return (
    <RHFAutocompleteAsync
      name="authorId"
      label="Author"
      placeholder="Select an author"
      size="small"
      fullWidth
      externalParams={{ admin: true }}
      apiQuery={apiQueryAuthor}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};

export default AuthorsFields;
