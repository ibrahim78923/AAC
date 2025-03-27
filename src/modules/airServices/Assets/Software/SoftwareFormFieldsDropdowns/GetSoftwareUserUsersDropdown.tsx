import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';
import { Box, Typography } from '@mui/material';

const GetSoftwareUserUsersDropdown: React.FC = () => {
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  const userDropdown = useLazyGetUsersDropdownListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="user"
        label="User"
        fullWidth
        size="small"
        placeholder="Select User"
        apiQuery={userDropdown}
        externalParams={{ productId }}
        required
        getOptionLabel={(option: any) =>
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
    </>
  );
};

export default GetSoftwareUserUsersDropdown;
