import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const CatalogServiceSoftware = (prop: any) => {
  const theme: any = useTheme();
  const { servicesDetails } = prop;
  return (
    <>
      <>
        <Box maxWidth={'65%'} sx={{ color: theme?.palette?.blue?.lighter }}>
          <Typography variant="body1">Description:</Typography>
          <br />
          <Typography
            variant="body4"
            dangerouslySetInnerHTML={{
              __html: servicesDetails?.data?.description,
            }}
          />

          <br />
        </Box>
      </>
    </>
  );
};
export default CatalogServiceSoftware;
