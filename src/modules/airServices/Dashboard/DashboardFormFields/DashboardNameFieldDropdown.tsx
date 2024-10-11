import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesDashboardDashboardNameDropdownListQuery } from '@/services/airServices/dashboard';

const { DROPDOWNS_RECORD_LIMIT, CURRENT_PAGE } = PAGINATION ?? {};

export const DashboardNameFieldDropdown = () => {
  const apiQueryDashboardName =
    useLazyGetServicesDashboardDashboardNameDropdownListQuery();

  const auth: any = useAuth();
  const productId: any = auth?.product?._id ?? {};

  return (
    <RHFAutocompleteAsync
      label="Dashboard Name"
      name="dashboard"
      placeholder="Select dashboards"
      fullWidth
      size="small"
      apiQuery={apiQueryDashboardName}
      externalParams={{
        limit: DROPDOWNS_RECORD_LIMIT,
        page: CURRENT_PAGE,
        productId,
      }}
    />
  );
};
