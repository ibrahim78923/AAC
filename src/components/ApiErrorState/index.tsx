import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { NoAssociationFoundImage } from '@/assets/images';

const ApiErrorState = (props: any) => {
  const { height = '50vh', textColor = 'slateBlue.main' } = props;
  return (
    <Box
      height={height}
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
      <Typography variant="h5" color={textColor}>
        SOMETHING WENT WRONG!
      </Typography>
    </Box>
  );
};

export default ApiErrorState;
