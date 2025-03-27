import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUsersDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';
import { Box, Typography } from '@mui/material';

const GetContractAdminAgentDropdown = () => {
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  const apiQueryApprover =
    useLazyGetUsersDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="approver"
        label="Approver"
        placeholder="Select Approver"
        fullWidth
        size="small"
        apiQuery={apiQueryApprover}
        externalParams={{ productId, admin: true }}
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

export default GetContractAdminAgentDropdown;
