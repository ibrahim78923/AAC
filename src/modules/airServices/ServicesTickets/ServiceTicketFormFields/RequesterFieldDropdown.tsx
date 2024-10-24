import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useRouter } from 'next/router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';
import { useMemo } from 'react';
import { getActiveProductSession } from '@/utils';
import { AIR_SERVICES } from '@/constants/routes';

export const RequesterFieldDropdown = (props: any) => {
  const { required = true, hasEndIcon = true, label = 'Requester' } = props;
  const router = useRouter();
  const apiQueryRequester =
    useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery();

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  return (
    <RHFAutocompleteAsync
      name="requester"
      label={label}
      placeholder="Search Requester"
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
