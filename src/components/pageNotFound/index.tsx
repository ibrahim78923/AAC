import { ComingSoonImage } from '@/assets/images';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

const PageNotFound = ({
  image = ComingSoonImage,
  message = 'Exciting new features coming soon! Stay tuned for updates.',
  children,
  height = '70vh',
}: any) => {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      height={height}
    >
      <Grid item textAlign={'center'}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={image} width={0} height={0} alt="Not Found" />
        </Box>
        <Typography variant="h6" mb={2}>
          {message}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
