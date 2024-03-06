import { Box, Typography, Button, Stack } from '@mui/material';
import { styles } from './ConnectNumber.style';
import { SmsMainIcon } from '@/assets/icons';

import useConnectNumber from './useConnectNumber';
import AddRegNumber from './AddRegNumber';
import OTPVerification from './OTPVerification';
import Image from 'next/image';
import { SmsMockImage, TwillioImage } from '@/assets/images';

const ConnectNumber = ({ setIsNumberConnected }: any) => {
  const {
    openDialogRegNumber,
    handleOpenDialogRegNumber,
    handleCloseDialogRegNumber,
    handleAddRegNumSubmit,
    openDialogVerification,
    handleCloseDialogVerification,
    handleVerificationSubmit,
    isPhoneValid,
    phoneNumber,
    handlePhoneChange,
    theme,
  } = useConnectNumber();
  return (
    <>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
        gap={1}
      >
        <Stack direction="row" alignItems="center" sx={styles?.header}>
          <Box sx={styles?.icon}>
            <SmsMainIcon />
          </Box>
          <Box>
            <Typography sx={{ lineHeight: '1.25' }} variant="h3">
              SMS Marketing
            </Typography>
            <Box sx={styles?.headerText}>
              Connect SMS Services Provider bring all your conversation here
            </Box>
          </Box>
        </Stack>
        <Box>
          <Button variant="contained" onClick={handleOpenDialogRegNumber}>
            Connect your Number
          </Button>
        </Box>
      </Stack>

      <Box sx={styles?.divider} />
      <Box>
        <Stack gap={2}>
          <Typography sx={{ lineHeight: '1.25' }} variant="h6" fontWeight={600}>
            Text your contacts automatically in real time
          </Typography>
          <Typography
            sx={{ lineHeight: '1.25', color: theme?.palette?.custom?.main }}
            variant="body2"
            fontWeight={600}
          >
            Connect your SMS service provider (Twilio) account to create SMS
            campaign
          </Typography>
          <Image src={TwillioImage} alt="mock" />
          <Image src={SmsMockImage} alt="mock" />
        </Stack>
      </Box>

      {openDialogRegNumber && (
        <AddRegNumber
          open={openDialogRegNumber}
          onClose={handleCloseDialogRegNumber}
          onSubmit={handleAddRegNumSubmit}
          onPhoneChange={handlePhoneChange}
          phoneValue={phoneNumber}
          isPhoneValid={isPhoneValid}
        />
      )}

      {openDialogVerification && (
        <OTPVerification
          open={openDialogVerification}
          onClose={handleCloseDialogVerification}
          onSubmit={() => {
            handleVerificationSubmit();
            setIsNumberConnected(true);
          }}
        />
      )}
    </>
  );
};

export default ConnectNumber;
