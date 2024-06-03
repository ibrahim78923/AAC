import { useRouter } from 'next/router';
import { Box, Card, Grid, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES, SOCIAL_COMPONENTS } from '@/constants';
import { scheduleCards } from './ScheduleMeetings.data';
import { styles } from './ScheduleMeetings.style';

export const ScheduleMeetings = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  return (
    <>
      <PageTitledHeader
        title="Select Meeting Category"
        canMovedBack
        moveBack={() =>
          ticketId
            ? router?.push({
                pathname: AIR_SERVICES?.TICKETS_LIST,
                query: {
                  ticketId: ticketId,
                },
              })
            : router?.push(SOCIAL_COMPONENTS?.MEETINGS)
        }
      />
      <Grid container spacing={{ lg: 3, xs: 2 }}>
        {scheduleCards?.map((item: any) => (
          <Grid item xl={3} lg={4} md={6} xs={12} key={item?.id}>
            <Box
              sx={styles?.cardBox}
              onClick={() =>
                router?.push({
                  pathname: SOCIAL_COMPONENTS?.UPSERT_MEETING,
                  query: item?.query,
                })
              }
            >
              <Card sx={styles?.cardStyle}>
                <item.icon />
                <Typography variant="formTopHeading" color="slateBlue.main">
                  {item?.title}
                </Typography>
                <Typography variant="body2">{item?.description}</Typography>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
