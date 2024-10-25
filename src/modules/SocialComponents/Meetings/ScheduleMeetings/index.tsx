import { useRouter } from 'next/router';
import { Box, Card, Grid, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { scheduleCards } from './ScheduleMeetings.data';
import { styles } from './ScheduleMeetings.style';
import { SOCIAL_COMPONENTS } from '@/constants/routes';

export const ScheduleMeetings = () => {
  const router = useRouter();
  const moduleId = router?.query?.moduleId;
  const moduleType = router?.query?.moduleType;

  return (
    <>
      <PageTitledHeader
        title="Select Meeting Category"
        canMovedBack
        moveBack={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS)}
      />
      <Grid container spacing={{ lg: 3, xs: 2 }}>
        {scheduleCards(moduleId, moduleType)?.map((item: any) => (
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
