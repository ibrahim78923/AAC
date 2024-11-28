import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useTicketStatusCount } from './useTicketStatusCount';
import ApiErrorState from '@/components/ApiErrorState';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { TicketStatusCountImage } from '@/assets/images';

export const TicketStatusCount = () => {
  const { isError, refetch, apiCallInProgress, ticketDashboardCards } =
    useTicketStatusCount();

  if (apiCallInProgress) return <SkeletonCard hasThirdSkeleton={false} />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <Grid container spacing={2}>
      {ticketDashboardCards?.map((item: any) => (
        <Grid key={item?.id} item xs={12} md={4} lg={3}>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={1.5}
            flexWrap={'wrap'}
            borderRadius={2}
            border={`1px solid `}
            borderColor="custom.off_white_three"
            px={1.5}
            py={1}
            height={'100%'}
          >
            <Box>
              <Avatar
                alt={item?.label}
                src={TicketStatusCountImage?.src}
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: item?.color,
                  p: 1,
                }}
              />
            </Box>
            <Box>
              <Typography variant="h4" color="slateBlue.main">
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
