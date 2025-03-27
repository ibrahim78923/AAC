import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ROLES } from '@/constants/strings';
import { useLazyGetServicesDashboardDashboardOwnersDropdownListQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

export const DashboardOwnersFieldDropdown = (props: any) => {
  const {
    name = 'owner',
    label = 'Owner',
    placeholder = 'Select owner',
    multiple = false,
    required = false,
    moreQueryParams = {},
  } = props;

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  const apiQueryOwner =
    useLazyGetServicesDashboardDashboardOwnersDropdownListQuery?.();

  return (
    <RHFAutocompleteAsync
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth
      required={required}
      apiQuery={apiQueryOwner}
      multiple={multiple}
      size="small"
      externalParams={{ productId, ...moreQueryParams }}
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
