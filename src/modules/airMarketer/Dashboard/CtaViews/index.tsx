import { Card, Typography, Grid, Box, useTheme } from '@mui/material';
import { ctaViewsData } from './CtaViews.data';
import { v4 as uuidv4 } from 'uuid';

const CtaViews = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6}>
        {/* sx={{ backgroundColor: theme?.palette?.grey[700] }} */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CTA total Views and Ads submissions
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              Date range: In last 30 days | Compared To: Previous 30 days
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={2} mt={3} mx={2}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {ctaViewsData?.map((widgetData: any) => (
            <Grid item sm={6} xs={12} key={uuidv4()}>
              <Card
                sx={{
                  py: '25px',
                  px: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  fontWeight={500}
                  color={theme.palette?.grey[600]}
                  variant="body2"
                >
                  {widgetData?.dealName}
                </Typography>

                <Typography variant="h5" color={theme?.palette?.primary?.main}>
                  {widgetData?.totalCtaViews}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};
export default CtaViews;
