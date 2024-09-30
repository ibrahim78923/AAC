import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetServiceTicketsCatalogCategoriesDropdownListQuery } from '@/services/airServices/tickets/single-ticket-details/details';

export const ServicesFieldDropdown = (props: any) => {
  const { categoryId } = props;
  const apiQueryServicesCategory =
    useLazyGetServiceTicketsCatalogCategoriesDropdownListQuery?.();

  return (
    <RHFAutocompleteAsync
      name="service"
      label="Service"
      placeholder="Select service"
      fullWidth
      size="small"
      required
      apiQuery={apiQueryServicesCategory}
      externalParams={{ categoryId }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) => option?.itemName}
    />
  );
};
