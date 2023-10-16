import React from 'react';
import { Box, Typography, Theme, useTheme, Grid } from '@mui/material';

const InvoicingCard = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant="body2"
              sx={{
                color: `${theme?.palette?.grey[800]}`,
                fontWeight: 600,
                paddingBottom: '1rem',
              }}
            >
              Invoicing
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#6B7280' }}
                  >
                    Invoice paid
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#47B263' }}>
                    £ 50.3k
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#6B7280' }}
                  >
                    Follow up soon
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#0AADC7' }}>
                    £ 54.1k
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#6B7280' }}
                  >
                    Follow up now
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FF4A4A' }}>
                    £ 41.8k
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              background:
                'linear-gradient(236.18deg, #EBFAF8 -12.81%, rgba(235, 250, 248, 0) 104.87%)',
            }}
          >
            graph
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoicingCard;
