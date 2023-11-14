import { mediaAssetsData } from '@/mock/modules/SocialComponents/Chat';
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const MediaAssets = () => {
  return (
    <Box>
      {mediaAssetsData?.map((media: any) => (
        <Box key={uuidv4()}>
          <Typography variant="body3" sx={{ fontWeight: '600' }}>
            {media?.date}
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{ marginTop: '1px', marginBottom: '2px' }}
          >
            {media?.media?.map((item: any) => (
              <Grid item lg={4} key={uuidv4()}>
                <Image src={item?.img} height={100} alt="media" />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MediaAssets;
