import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { smsStatusArray } from '../SMSDashboard.data';

import useStatusCards from './useStatusCards';

import { v4 as uuidv4 } from 'uuid';

const StatusCards = () => {
  const { theme } = useStatusCards();

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={5}>
        {smsStatusArray?.map((item: any) => (
          <Grid item xs={6} sm={4} lg={3} xl={2.4} key={uuidv4()}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              gap={2}
              className="innerCard"
              justifyContent="space-between"
            >
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
              {item?.divider && (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderColor: theme?.palette?.custom?.off_white_three }}
                />
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatusCards;
