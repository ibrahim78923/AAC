import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { NoDataPropsI } from './NoData.interface';

export default function NoData({ image, message, children }: NoDataPropsI) {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      height={'70vh'}
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
}
