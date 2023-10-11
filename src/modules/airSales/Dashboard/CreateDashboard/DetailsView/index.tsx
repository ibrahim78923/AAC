import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

import Image from 'next/image';

import { NotSelectedItemImage } from '@/assets/images';

import { styles } from './DetailsView.style';

const DetailsView = () => {
  return (
    <Card sx={{ height: '100vh' }}>
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
