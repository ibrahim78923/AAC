import React from 'react';

import Image from 'next/image';

import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import { delegateCardArr } from './DelegateCard.data';

import { CardbgImage } from '@/assets/images';

const DelegateCard = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        {delegateCardArr?.map((item) => {
          return (
            <>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(${CardbgImage.src})`,
                    backgroundPosition: 'cover',
                    height: '200px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    padding: '2rem',
                    borderRadius: '48px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      marginTop: {
                        lg: '20px',
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
                      <Image src={item?.icon} alt="icon missing" />
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
                      }}
                    >
                      {item?.totalMember}
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

export default DelegateCard;
