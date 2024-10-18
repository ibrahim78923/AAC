import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery } from '@/services/airServices/settings/service-management/service-catalog';

export const GetServicesCategoriesListDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiServiceCategoryQuery =
    useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name="serviceCategory"
      label="Service categories"
      placeholder="Choose category"
      fullWidth
      size="small"
      required
      disabled={disabled}
      apiQuery={apiServiceCategoryQuery}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        option?.categoryName
      }
    />
  );
};
