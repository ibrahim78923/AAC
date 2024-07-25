import { NoAssociationFoundImage } from '@/assets/images';
import { Grid, Typography, Box, Avatar } from '@mui/material';

const NoData = ({
  image = NoAssociationFoundImage,
  message = 'No data found',
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
          <Avatar
            src={image?.src}
            alt="Not Found"
            style={{ width: '100%', height: '100%' }}
            variant={'rounded'}
          />
        </Box>
        <Typography variant="h6" mb={2}>
          {message}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default NoData;
