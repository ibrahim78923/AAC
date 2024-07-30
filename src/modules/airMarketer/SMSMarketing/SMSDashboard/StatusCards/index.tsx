import { Box, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import useStatusCards from './useStatusCards';
import { v4 as uuidv4 } from 'uuid';
import useSMSDashboard from '../useSMSDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { StatusCardsProps } from '@/modules/airMarketer/SMSMarketing/SMSDashboard/SMSDashboard-interface';

const StatusCards = ({
  analytics,
  isDashboard = true,
  isLoading,
}: StatusCardsProps) => {
  const { dashboardCards, dashboardLoading } = useSMSDashboard();
  const { theme, smsStatusArray } = useStatusCards(
    dashboardCards,
    analytics ?? dashboardCards,
    isDashboard,
  );

  return (
    <Box sx={{ p: 1 }}>
      {dashboardLoading ? (
        <SkeletonTable />
      ) : (
        <Grid container spacing={5}>
          {smsStatusArray?.map((item: any) => (
            <Grid item xs={6} sm={4} lg={3} xl={2.4} key={uuidv4()}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                gap={2}
                className="innerCard"
                justifyContent="space-between"
              >
                {isLoading ? (
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
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                  >
                    {item?.icon}
                    <Box>
                      <Typography variant="h3" fontWeight="700">
                        {item?.count}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="500"
                        color={theme?.palette?.custom?.dim_grey}
                      >
                        {item?.title}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {item?.divider && (
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                      borderColor: theme?.palette?.custom?.off_white_three,
                    }}
                  />
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StatusCards;
