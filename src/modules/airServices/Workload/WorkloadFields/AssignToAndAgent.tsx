import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesAllUsersInWorkloadQuery } from '@/services/airServices/workload';

export const AssignToAndAgent = (props: any) => {
  const { name, label } = props;
  const apiQueryAssignToAndAgent =
    useLazyGetAirServicesAllUsersInWorkloadQuery();

  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name={name}
      label={label}
      placeholder={'Select'}
      size={'small'}
      apiQuery={apiQueryAssignToAndAgent}
      externalParams={{
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
