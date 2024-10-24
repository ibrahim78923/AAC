import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetAirServicesLifeCycleStageQuery } from '@/services/airServices/tickets/single-ticket-details/association';

export const LifeCycleStageDropdown = (props: any) => {
  const { disabled = false } = props;

  const apiQueryLifecycleStage = useLazyGetAirServicesLifeCycleStageQuery();

  return (
    <RHFAutocompleteAsync
      name={'lifeCycleStageId'}
      label={'Lifecycle Stage'}
      placeholder={'Select Lifecycle Stage'}
      apiQuery={apiQueryLifecycleStage}
      size={'small'}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        meta: false,
      }}
      disabled={disabled}
    />
  );
};
