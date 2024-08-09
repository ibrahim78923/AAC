import { NoAssociationFoundImage } from '@/assets/images';
import { Typography, Box, Avatar } from '@mui/material';

const NoData = ({
  image = NoAssociationFoundImage,
  message = 'No data found',
  children,
  height = '70vh',
}: any) => {
  return (
    <Box
      height={height}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      {!!image && (
        <Box
          display={'grid'}
          sx={{
            placeItems: 'center',
            placeContent: 'center',
          }}
        >
          <Avatar
            src={image?.src}
            alt="Not Found"
            style={{ width: '100%', height: '100%' }}
            variant={'rounded'}
          />
        </Box>
      )}
      <Typography variant="h6" mb={2}>
        {message}
      </Typography>
      {children}
    </Box>
  );
};

export default NoData;
