import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAirServicesSettingsBusinessHourDropdownQuery } from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';

export const BusinessHoursDropdown = () => {
  const apiQueryBusinessHours =
    useLazyGetAirServicesSettingsBusinessHourDropdownQuery();

  return (
    <RHFAutocompleteAsync
      name={'businessHoursId'}
      label={'Business Hours'}
      placeholder="Choose Business Hours"
      size={'small'}
      apiQuery={apiQueryBusinessHours}
    />
  );
};
