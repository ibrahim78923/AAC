import { Avatar, Box, Typography } from '@mui/material';
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
        <Avatar
          src={NoAssociationFoundImage?.src}
          alt="Error"
          style={{ width: '100%', height: '100%' }}
          variant={'rounded'}
        />
      </Box>
      <Typography variant="h5" color={textColor}>
        SOMETHING WENT WRONG!
      </Typography>
    </Box>
  );
};

export default ApiErrorState;
