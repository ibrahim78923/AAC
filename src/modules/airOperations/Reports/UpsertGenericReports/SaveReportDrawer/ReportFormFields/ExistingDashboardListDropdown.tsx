import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyDashboardDropdownQuery } from '@/services/airOperations/reports/upsert-generic-reports';
import { useRouter } from 'next/router';

export const ExistingDashboardListDropdown = () => {
  const router: any = useRouter();
  const { id } = router?.query;
  const dashboardDropdown = useLazyDashboardDropdownQuery();

  return (
    <RHFAutocompleteAsync
      size="small"
      name="addToExistingCondition"
      label="Select Dashboard"
      required={true}
      multiple={true}
      apiQuery={dashboardDropdown}
      getOptionLabel={(option: any) => option?.name}
      placeholder="Select Option"
      externalParams={{
        productId: id,
      }}
    />
  );
};
