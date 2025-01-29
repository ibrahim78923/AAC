import { EditRequestorsIcon } from '@/assets/icons';
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import UpsertRequesters from '../../UpsertRequesters';
import { RequestedTickets } from '../RequestedTickets';
import { fullName, generateImage } from '@/utils/avatarUtils';
import { useRequesterDetails } from './useRequesterDetails';
import { DATE_TIME_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';
import { otherDateFormat } from '@/lib/date-time';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const RequestorsDetails = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isDrawerOpen,
    setIsDrawerOpen,
    refetch,
  }: any = useRequesterDetails();

  const theme = useTheme();

  return (
    <>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        errorHeight="40vh"
        length={3}
        skeletonType={SKELETON_TYPES?.GRID}
      >
        <Box
          border="2px solid"
          borderRadius={2}
          paddingY={2}
          borderColor="custom.off_white_three"
        >
          <ContainerGrid>
            <CustomGrid md={5}>
              <Box
                sx={{
                  height: '100%',
                  px: 1.5,
                  borderRight: {
                    md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  },
                  borderBottom: {
                    xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                    md: 'none',
                  },
                }}
              >
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  alignItems={'center'}
                  gap={3}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'blue.main',
                      width: 150,
                      height: 150,
                    }}
                    src={generateImage(data?.data?.avatar?.url)}
                  />
                  <Box
                    flex={1}
                    flexDirection={'column'}
                    display={'flex'}
                    flexWrap={'wrap'}
                  >
                    <Box my={2}>
                      <Typography
                        variant="h5"
                        color="slateBlue.main"
                        fontWeight={600}
                      >
                        {
                          <TruncateText
                            text={fullName(
                              data?.data?.firstName?.toLowerCase(),
                              data?.data?.lastName?.toLowerCase(),
                            )}
                          />
                        }
                      </Typography>
                      <Typography variant="body3" fontWeight={500}>
                        {' '}
                        Joined on{' '}
                        {otherDateFormat(
                          data?.data?.createdAt,
                          DATE_TIME_FORMAT?.DMYHMSA,
                        )}
                      </Typography>
                    </Box>
                    <Box
                      display={'flex'}
                      flexWrap={'wrap'}
                      justifyContent={'space-between'}
                      marginBottom={1}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Email:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {data?.data?.email ?? '---'}
                      </Typography>
                    </Box>
                    <Box
                      display={'flex'}
                      flexWrap={'wrap'}
                      justifyContent={'space-between'}
                      marginBottom={1}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Phone Number
                      </Typography>
                      <Typography variant="body2">
                        {data?.data?.phoneNumber ?? '---'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CustomGrid>
            <CustomGrid md={5}>
              <Box sx={{ padding: 1.5 }}>
                <Box display={'flex'} flexWrap={'wrap'} gap={1} my={2}>
                  <Typography variant="body2" fontWeight={600}>
                    Job Title
                  </Typography>
                  <Typography variant="body2" sx={{ flex: '1' }} />
                  {<TruncateText text={data?.data?.jobTitle?.toLowerCase()} />}
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  my={2}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Email:
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {data?.data?.email ?? '---'}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  marginBottom={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Mobile Phone
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {data?.data?.phoneNumber ?? 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </CustomGrid>
            <CustomGrid md={2}>
              <Box sx={{ textAlign: 'end' }}>
                <IconButton onClick={() => setIsDrawerOpen(true)}>
                  <EditRequestorsIcon />
                </IconButton>
              </Box>
            </CustomGrid>
          </ContainerGrid>
        </Box>
      </ApiRequestFlow>
      <Box py={'18px'}>
        <Typography variant="h3">Associations</Typography>
      </Box>
      <Box py={'1.125rem'}>
        <Typography variant="h6">Requested</Typography>
        <br />
        <RequestedTickets />
      </Box>
      {isDrawerOpen && (
        <UpsertRequesters
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          singleRequesterDetails={data?.data}
        />
      )}
    </>
  );
};
