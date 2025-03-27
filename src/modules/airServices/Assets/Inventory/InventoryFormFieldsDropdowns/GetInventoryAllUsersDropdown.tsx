import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAirServicesAssetsInventoryUsersDropdownQuery } from '@/services/airServices/assets/inventory';
import { Box, Typography } from '@mui/material';

const GetInventoryAllUsersDropdown = () => {
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};

  const apiQueryUsedByType =
    useLazyGetAirServicesAssetsInventoryUsersDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="usedBy"
        label="Used By"
        placeholder="Name"
        apiQuery={apiQueryUsedByType}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
        externalParams={{ productId, requester: true, admin: true }}
        fullWidth
        size="small"
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
    </>
  );
};

export default GetInventoryAllUsersDropdown;
