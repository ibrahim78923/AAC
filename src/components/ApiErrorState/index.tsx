import { Avatar, Box, Button, Typography } from '@mui/material';
import { NoAssociationFoundImage } from '@/assets/images';
import { ApiErrorStatePropsI } from './ApiErrorState.interface';

const ApiErrorState = (props: ApiErrorStatePropsI) => {
  const {
    height = '50vh',
    textColor = 'slateBlue.main',
    message = 'SOMETHING WENT WRONG!',
    children,
    refresh,
    canRefresh = false,
    refreshButtonProps,
  } = props;

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
        {message}
      </Typography>
      <br />
      {children}
      {canRefresh && (
        <Button
          variant="contained"
          onClick={() => refresh?.()}
          {...refreshButtonProps}
        >
          Refresh
        </Button>
      )}
    </Box>
  );
};

export default ApiErrorState;
