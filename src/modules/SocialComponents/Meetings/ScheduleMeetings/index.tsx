import { useRouter } from 'next/router';
import { Box, Card, Grid, Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS } from '@/constants';
import { scheduleCards } from './ScheduleMeetings.data';
import { styles } from './ScheduleMeetings.style';

export const ScheduleMeetings = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        title="Select Meeting Category"
        canMovedBack
        moveBack={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS)}
      />
      <Grid container spacing={{ lg: 3, xs: 2 }}>
        {scheduleCards?.map((item: any) => (
          <Grid item xl={3} lg={4} md={6} xs={12} key={item?.id}>
            <Box sx={styles?.cardBox} onClick={() => router?.push(item?.link)}>
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
