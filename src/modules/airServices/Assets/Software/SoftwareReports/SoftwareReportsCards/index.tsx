import { Box, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { pxToRem } from '@/utils/getFontValue';
import { camelCaseToTitleCase } from '@/utils/api';

export const SoftwareReportsCards = ({ softwareReportsCardsData }: any) => {
  return (
    <Grid container spacing={1.5} mb={2}>
      {Object?.entries(softwareReportsCardsData)?.map(([key, value]: any) => (
        <Grid item lg={3} md={6} xs={12} key={key}>
          <Box
            boxShadow={1}
            border={'1px solid'}
            borderColor={'custom.off_white_one'}
            borderRadius={2}
            px={2}
            py={3}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={0.5}
          >
            <Typography variant="h6" color={'slateBlue.main'}>
              {camelCaseToTitleCase?.(key)}
            </Typography>
            <Chip
              label={value}
              sx={{
                fontSize: pxToRem(16),
                fontWeight: 500,
              }}
              color="primary"
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
