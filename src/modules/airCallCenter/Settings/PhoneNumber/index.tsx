import { Box, Button, Card, Typography } from '@mui/material';
import usePhoneNumber from './usePhoneNumber';
import { AttachFilePrimaryIcon } from '@/assets/icons';
import { styles } from './PhoneNumber.style';
import BuyNewNumberDrawer from './BuyNewNumberDrawer';

const PhoneNumber = () => {
  const { theme, isBuyNewNumber, setIsBuyNewNumber } = usePhoneNumber();
  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
        Phone Numbers
      </Typography>
      <Card sx={styles?.phoneNumberWrapper}>
        <AttachFilePrimaryIcon />
        <Typography
          color={theme?.palette?.grey[900]}
          variant="body3"
          fontWeight={500}
          component="p"
        >
          Start by buying a new number
        </Typography>
        <Button
          variant="contained"
          className="small"
          onClick={() => setIsBuyNewNumber(true)}
        >
          Buy new number
        </Button>
      </Card>
      <BuyNewNumberDrawer
        isBuyNewNumber={isBuyNewNumber}
        setIsBuyNewNumber={setIsBuyNewNumber}
      />
    </Box>
  );
};

export default PhoneNumber;
