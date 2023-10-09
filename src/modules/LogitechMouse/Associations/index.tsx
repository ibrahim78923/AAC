import React from 'react';
import { Grid, Typography, Box, useMediaQuery, Button } from '@mui/material';
import Image from 'next/image';
import { associationsImage, plusImage } from '@/assets/images';
import { associationstyles } from './Associations.style';

const Associations = () => {
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: '182px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={associationsImage} alt="Picture of the associations" />
        </Box>
        <Typography sx={{ ...associationstyles.associationTitle, mt: '16px' }}>
          There are no associations
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '16px',
            marginBottom: '320px',
          }}
        >
          <Button
            sx={{ ...associationstyles.associationButton }}
            fullWidth={matches}
            startIcon={<Image src={plusImage} alt="Plus Icon" />}
            // variant="contained"
          >
            Associate
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Associations;
