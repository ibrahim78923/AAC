import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetServicesDashboardDashboardNameDropdownListQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

const { DROPDOWNS_RECORD_LIMIT, CURRENT_PAGE } = PAGINATION ?? {};

export const DashboardNameFieldDropdown = () => {
  const apiQueryDashboardName =
    useLazyGetServicesDashboardDashboardNameDropdownListQuery();

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

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
