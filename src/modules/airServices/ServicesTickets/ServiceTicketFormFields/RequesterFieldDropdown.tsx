import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { AIR_SERVICES } from '@/constants';
import { useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery } from '@/services/airServices/tickets';
import { useRouter } from 'next/router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useAuth from '@/hooks/useAuth';

export const RequesterFieldDropdown = (props: any) => {
  const { required = true, hasEndIcon = true } = props;
  const router = useRouter();
  const apiQueryRequester =
    useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name="requester"
      label="Requester"
      placeholder="Choose Requester"
      fullWidth
      required={required}
      apiQuery={apiQueryRequester}
      EndIcon={hasEndIcon && AddCircleIcon}
      size="small"
      externalParams={{
        requester: true,
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
      endIconClick={() => router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS)}
    />
  );
};
