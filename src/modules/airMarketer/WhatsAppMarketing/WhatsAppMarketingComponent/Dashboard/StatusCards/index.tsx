import { Box, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { smsStatusArray, smsStatusArrayStatic } from '../Dashboard.data';
import useStatusCards from './useStatusCards';
import { v4 as uuidv4 } from 'uuid';

const StatusCards = ({
  whatsappAnalytics,
  loading,
  isDashboardData = true,
}: any) => {
  const { theme } = useStatusCards();
  const analyticData = isDashboardData
    ? smsStatusArrayStatic
    : smsStatusArray(whatsappAnalytics);
  return (
    <Box sx={{ p: '10px 24px' }}>
      <Grid container spacing={5}>
        {analyticData?.map((item: any) => (
          <Grid item xs={6} sm={4} lg={3} xl={2.4} key={uuidv4()}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              gap={2}
              className="innerCard"
              justifyContent="space-between"
            >
              {loading ? (
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                  <Skeleton
                    variant="circular"
                    height={45}
                    width={45}
                    animation="wave"
                  />
                  <Skeleton animation="wave" width={200} height={36} />
                </Stack>
              ) : (
                <>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                  >
                    {item?.icon}
                    <Box>
                      <Typography variant="h3">{item?.count}</Typography>
                      <Typography variant="body1">{item?.title}</Typography>
                    </Box>
                  </Box>
                  {item?.divider && (
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ borderColor: theme?.palette?.custom?.bluish_gray }}
                    />
                  )}
                </>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatusCards;
