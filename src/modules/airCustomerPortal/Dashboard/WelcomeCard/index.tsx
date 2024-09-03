import { Box, Typography } from '@mui/material';
import { styles } from './WelcomeCard.style';
import { WelcomeCardImage } from '@/assets/images';
import { TicketStatusCount } from '../TicketStatusCount';

export const WelcomeCard = (props: any) => {
  const { isRegister = true } = props;
  const { mainWrapper } = styles;

  return (
    <>
      <Box
        sx={{
          ...mainWrapper,
          backgroundImage: `url(${WelcomeCardImage?.src})`,
        }}
      >
        <Box flexBasis={{ xs: '100%', xl: '50%' }} py={isRegister ? 1 : 4}>
          <Typography variant="h4" fontWeight={700} color={'white'}>
            Welcome to AirApple Cart - Services
          </Typography>
          <Typography variant="body2" color={'white'}>
            We are here to help you, Please let us know what you need.
          </Typography>
        </Box>
        {isRegister ? <TicketStatusCount /> : <></>}
      </Box>
    </>
  );
};
