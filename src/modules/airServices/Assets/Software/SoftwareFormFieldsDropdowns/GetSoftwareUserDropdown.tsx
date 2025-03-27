import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUserDropdownQuery } from '@/services/airServices/assets/software';
import { Box, Typography } from '@mui/material';

const GetSoftwareUserDropdown = () => {
  const userQuery = useLazyGetUserDropdownQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  return (
    <>
      <RHFAutocompleteAsync
        name="managedBy"
        label="Managed By"
        placeholder="Select User"
        fullWidth
        apiQuery={userQuery}
        externalParams={{ productId }}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
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

export default GetSoftwareUserDropdown;
