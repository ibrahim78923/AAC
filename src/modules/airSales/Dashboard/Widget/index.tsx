import { Card, Typography, Grid, Box, useTheme, Stack } from '@mui/material';
import { widgetData } from './Widget.data';
import { v4 as uuidv4 } from 'uuid';
import { FilterLargeWidgetIcon } from '@/assets/icons';

const Widget = ({ widgetDetails }: any) => {
  const theme = useTheme();
  return (
    <Card style={{ minHeight: '450px' }}>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5">Widget</Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              Date range In last 30 days | compare To : Year before
            </Typography>
          </Box>
          <Box>
            <FilterLargeWidgetIcon />
          </Box>
        </Stack>
      </Box>
      <Grid container spacing={1}>
        {widgetData(widgetDetails)?.map((widgetData: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3.4} key={uuidv4()}>
            <Card sx={{ maxHeight: '84px', minWidth: '131px', margin: '20px' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: theme.palette?.slateBlue?.main,
                }}
                color="text.secondary"
                gutterBottom
                mt={1}
              >
                {widgetData?.dealName}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 1.5,
                  color: theme?.palette?.primary?.main,
                  textAlign: 'center',
                }}
              >
                {widgetData?.totalDeals}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
export default Widget;
