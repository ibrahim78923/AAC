import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesAllUsersInWorkloadQuery } from '@/services/airServices/workload';
import { Box, Typography } from '@mui/material';

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
