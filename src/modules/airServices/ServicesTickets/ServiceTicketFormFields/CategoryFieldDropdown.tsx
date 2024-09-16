import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetCategoriesDropdownForTicketsQuery } from '@/services/airServices/tickets';

export const CategoryFieldDropdown = (props: any) => {
  const { required = false } = props;
  const apiQueryCategory = useLazyGetCategoriesDropdownForTicketsQuery();

  return (
    <RHFAutocompleteAsync
      name="category"
      label="Category"
      placeholder="Choose Category"
      fullWidth
      size="small"
      required={required}
      apiQuery={apiQueryCategory}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        option?.categoryName
      }
    />
  );
};
