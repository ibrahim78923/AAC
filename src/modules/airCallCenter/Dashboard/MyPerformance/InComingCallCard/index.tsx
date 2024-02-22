import React from 'react';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

const InComingCallCard = ({ CallCardArr }: any) => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        {CallCardArr?.map((item) => {
          return (
            <>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(${item?.image?.src})`,
                    backgroundPosition: 'cover',
                    height: '125px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    padding: '1rem',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'end',
                      flexWrap: 'wrap',
                      marginTop: {
                        lg: '0px',
                        md: '20px',
                        sm: '15px',
                        xs: '-25px',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 400,
                          color: `${theme?.palette?.common?.white}`,
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 500,
                        color: `${theme?.palette?.common?.white}`,
                        marginTop: '15px',
                      }}
                    >
                      {item?.totalCall}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default InComingCallCard;
