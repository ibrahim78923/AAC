import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetCategoriesDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';

export const CategoryFieldDropdown = (props: any) => {
  const { required = false, disabled = false } = props;
  const apiQueryCategory =
    useLazyGetCategoriesDropdownForServicesTicketsQuery();

  return (
    <RHFAutocompleteAsync
      name="category"
      label="Category"
      placeholder="Choose Category"
      fullWidth
      size="small"
      required={required}
      disabled={disabled}
      apiQuery={apiQueryCategory}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        option?.categoryName
      }
    />
  );
};
