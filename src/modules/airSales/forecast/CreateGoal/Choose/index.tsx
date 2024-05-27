import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { AddPlusPrimaryshadow } from '@/assets/icons';

const Choose = (props: any) => {
  const { setCreateScratch, handleNextStep } = props;
  const theme = useTheme();
  return (
    <Grid container xs={12} spacing={1} justifyContent="center" mt={9}>
      <Grid item xs={12} md={6} lg={3}>

        <Box
          onClick={() => {
            setCreateScratch(true);
            handleNextStep();
          }}
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center',
            cursor: 'pointer',
            height: 'fit-content',

            '&:hover': {
              boxShadow: `0px 0px 20px 1px ${theme?.palette?.primary?.light}`,
            },
          }}
        >
          <AddPlusPrimaryshadow />
          <Typography variant="h6" mt={2} mb={2}>
            Create from Scratch
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: '25px' }}>
            Start a goal from the beginning with a wide range of choices for
            properties and aggregations to select from
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>

        <Box
          onClick={() => {
            setCreateScratch(false);
            handleNextStep();
          }}
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center',
            cursor: 'pointer',
            height: 'fit-content',

            '&:hover': {
              boxShadow: `0px 0px 20px 1px ${theme?.palette?.primary?.light}`,
            },
          }}
        >
          <AddPlusPrimaryshadow />
          <Typography variant="h6" mt={2} mb={2}>
            Create from Template
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: '25px' }}>
            Choose from pre-designed templates for sales, marketing, or service
            goals to get started quickly.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Choose;
