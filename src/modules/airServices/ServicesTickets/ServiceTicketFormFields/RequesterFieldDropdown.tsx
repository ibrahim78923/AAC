import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useRouter } from 'next/router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';
import { useMemo } from 'react';
import { getActiveProductSession } from '@/utils';
import { AIR_SERVICES } from '@/constants/routes';
import { Box, Typography } from '@mui/material';
import { ROLES } from '@/constants/strings';

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
      renderOption={(option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography
              variant={'body2'}
              color={'grey.600'}
              fontWeight={'fontWeightSmall'}
            >
              {option?.firstName} {option?.lastName}
            </Typography>
            {option?.role !== ROLES?.ORG_REQUESTER && (
              <Typography variant={'body4'} color={'grey.900'}>
                {option?.timezone}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    />
  );
};
