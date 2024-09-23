import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { ticketDashboardCardsData } from './PublicTicketStatusCount.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { usePublicTicketStatusCount } from './usePublicTicketStatusCount';

export const PublicTicketStatusCount = () => {
  const { data, isLoading, isFetching, isError, skip, error } =
    usePublicTicketStatusCount();

  if (skip) return <ApiErrorState />;
  if (!data && !error) return <SkeletonTable />;
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <Grid container spacing={3}>
      {ticketDashboardCardsData(data?.data)?.map((item: any) => (
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
                alt=""
                src={item?.icon?.src}
                sx={{ width: 60, height: 60 }}
              />
            </Box>
            <Box>
              <Typography variant="h3">{item?.count}</Typography>
              <Typography variant="body1">{item?.label}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
