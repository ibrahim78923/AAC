import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetOperationsReportsDashboardListsDropdownQuery } from '@/services/airOperations/reports';
import { useRouter } from 'next/router';

export const DashboardNameFieldDropdown = () => {
  const apiQueryServicesDashboard =
    useLazyGetOperationsReportsDashboardListsDropdownQuery();

  const router = useRouter();
  const id = router?.query?.id;

  return (
    <RHFAutocompleteAsync
      label="Dashboards"
      name="dashboard"
      fullWidth
      required
      apiQuery={apiQueryServicesDashboard}
      multiple
      size="small"
      placeholder="Search Here"
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        productId: id,
      }}
    />
  );
};
