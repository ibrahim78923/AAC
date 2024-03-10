import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useAgentBioData } from './useAgentBioData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const AgentBioData = () => {
  const theme = useTheme();
  const { data, isLoading, isFetching, isError }: any = useAgentBioData();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <Box
      sx={{
        border: `2px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '.5rem',
        paddingY: '1rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box height="100%">
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={3}
              height="100%"
            >
              <Avatar
                sx={{
                  bgcolor: 'blue.main',
                  width: 180,
                  height: 180,
                }}
                src={''}
              />
              <Box
                flex={1}
                flexDirection={'column'}
                display={'flex'}
                justifyContent={'space-between'}
                height="75%"
              >
                <Box>
                  <Typography
                    variant="h5"
                    color="slateBlue.main"
                    fontWeight={600}
                  >
                    {' '}
                    {data?.requesterDetails?.firstName ?? 'Rachel'}{' '}
                    {data?.requesterDetails?.lastName ?? 'Chris'}
                  </Typography>
                  <Typography variant="body3" fontWeight={500}>
                    {' '}
                    Joined on{' '}
                    {dayjs(data?.createdAt)?.format(DATE_TIME_FORMAT?.DMYHMSA)}
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
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {data?.requesterDetails?.email ?? 'test@test.com'}
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
                    {data?.requesterDetails?.phoneNumber ?? '+44123456789'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.9}
          padding={1.5}
          borderRight={{
            md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          }}
          borderBottom={{
            xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            md: 'none',
          }}
        >
          <Box display={'flex'} flexWrap={'wrap'} gap={1} marginBottom={1}>
            <Typography variant="body2" fontWeight={600}>
              Department
            </Typography>
            <Typography variant="body2" sx={{ flex: '1' }} />
            IT
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
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {data?.requesterDetails?.email}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
            marginBottom={1}
          >
            <Typography variant="body2" fontWeight={600}>
              Title
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              Mr.
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
              03372734737
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.9} padding={1.5}></Grid>
      </Grid>
    </Box>
  );
};
