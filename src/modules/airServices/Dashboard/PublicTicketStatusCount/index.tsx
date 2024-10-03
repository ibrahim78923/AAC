import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ApiErrorState from '@/components/ApiErrorState';
import { usePublicTicketStatusCount } from './usePublicTicketStatusCount';
import { TicketStatusCountImage } from '@/assets/images';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';

export const PublicTicketStatusCount = () => {
  const {
    data,
    isError,
    skip,
    error,
    apiCallInProgress,
    ticketDashboardCards,
    refetch,
  } = usePublicTicketStatusCount();

  if (skip) return <ApiErrorState canRefresh refresh={refetch} />;
  if (!data && !error) return <SkeletonCard hasThirdSkeleton={false} />;
  if (apiCallInProgress) return <SkeletonCard hasThirdSkeleton={false} />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <Grid container spacing={3}>
      {ticketDashboardCards?.map((item: any) => (
        <Grid key={item?.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={1.5}
            flexWrap={'wrap'}
            borderRadius={2}
            border={`1px solid `}
            borderColor="custom.off_white_three"
            p={1.5}
            height={'100%'}
          >
            <Box>
              <Avatar
                alt={item?.label}
                src={TicketStatusCountImage?.src}
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: item?.color,
                  p: 1,
                }}
              />
            </Box>
            <Box>
              <Typography variant="h3" color="slateBlue.main">
                {item?.count}
              </Typography>
              <Typography variant="body1" color="slateBlue.main">
                {item?.label}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
