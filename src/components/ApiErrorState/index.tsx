import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { NoAssociationFoundImage } from '@/assets/images';

const ApiErrorState = () => {
  return (
    <Box
      height={'50vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box
        display={'grid'}
        sx={{
          placeItems: 'center',
          placeContent: 'center',
        }}
      >
        <Image
          src={NoAssociationFoundImage}
          alt="Error"
          width={0}
          height={0}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Typography variant="h5">SOMETHING WENT WRONG!</Typography>
    </Box>
  );
};

export default ApiErrorState;
