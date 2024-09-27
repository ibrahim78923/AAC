import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetServicesDashboardDashboardNameDropdownListQuery } from '@/services/airServices/dashboard';

export const DashboardNameFieldDropdown = () => {
  const apiQueryDashboardName =
    useLazyGetServicesDashboardDashboardNameDropdownListQuery();

  return (
    <RHFAutocompleteAsync
      label="Dashboard Name"
      name="dashboard"
      placeholder="Select Dashboards"
      fullWidth
      size="small"
      apiQuery={apiQueryDashboardName}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        page: PAGINATION?.CURRENT_PAGE,
      }}
    />
  );
};
