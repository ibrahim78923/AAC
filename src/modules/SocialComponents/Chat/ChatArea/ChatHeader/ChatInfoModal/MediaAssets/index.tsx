import { IMG_URL } from '@/config';
import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const groupImagesByDate = (data: any) => {
  const groupedImages: any = {};
  data?.forEach((media: any) => {
    const date = new Date(media?.updatedAt)?.toLocaleDateString();

    if (!groupedImages[date]) {
      groupedImages[date] = [];
    }

    if (media?.media?.length > 0) {
      groupedImages[date] = groupedImages[date]?.concat(media?.media);
    }
  });
  const result = Object?.keys(groupedImages)?.map((dateGroup) => ({
    dateGroup,
    images: groupedImages[dateGroup],
  }));

  return result;
};

const MediaAssets = ({ data }: any) => {
  const groupedData = groupImagesByDate(data);

  return (
    <>
      <Box>
        {groupedData?.map((group) => (
          <Box key={uuidv4()}>
            <Typography variant="body3" sx={{ fontWeight: '600' }}>
              {group?.dateGroup} {/* Display the date */}
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{ marginTop: '1px', marginBottom: '2px' }}
            >
              {group?.images?.map((image: any) => (
                <Grid item lg={4} key={uuidv4()}>
                  <Image
                    src={`${IMG_URL}${image?.url}`}
                    height={100}
                    width={300}
                    alt="media"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MediaAssets;
