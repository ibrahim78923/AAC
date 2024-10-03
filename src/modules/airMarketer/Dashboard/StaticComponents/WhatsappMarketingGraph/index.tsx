import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import useWhatsappMarketing from './useWhatsappMarketingGraph';
import StatusCards from './StatusCards';
import StatisticsCard from './StatisticsCard';

const WhatsappMarketingGraph = () => {
  const { theme } = useWhatsappMarketing();
  return (
    <Card>
      <Box p={1.5}>
        <Stack direction="column">
          <Typography variant="h5" fontWeight={500}>
            Whatsapp Marketing
          </Typography>
          <Typography variant="body3" color={theme?.palette?.grey[900]}>
            Date range In last 30 days
          </Typography>
        </Stack>
        <Grid container>
          <Grid item xs={12}>
            <StatusCards />
          </Grid>
          <Grid item xs={12}>
            <StatisticsCard />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default WhatsappMarketingGraph;
