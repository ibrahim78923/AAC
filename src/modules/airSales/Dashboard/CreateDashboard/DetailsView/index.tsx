import Image from 'next/image';

import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

import { styles } from './DetailsView.style';

import { NotSelectedItemImage } from '@/assets/images';

const DetailsView = () => {
  return (
    <Card sx={{ height: '75vh' }}>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: 'center' }} gutterBottom>
          Details View
        </Typography>
        <Box>
          <Grid sx={styles?.defaultSelectedImage}>
            <Image src={NotSelectedItemImage} alt="not-selected-Item"></Image>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
export default DetailsView;
