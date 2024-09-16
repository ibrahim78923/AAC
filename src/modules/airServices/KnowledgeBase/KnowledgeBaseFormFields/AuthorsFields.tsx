import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';

export const AuthorsFields = () => {
  const apiQueryAuthor = useLazyGetUsersDropdownListForAuthorsQuery();
  return (
    <RHFAutocompleteAsync
      fullWidth
      name="authorId"
      label="Author"
      size="small"
      placeholder="Select an author"
      externalParams={{ admin: true }}
      apiQuery={apiQueryAuthor}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};

export default AuthorsFields;
