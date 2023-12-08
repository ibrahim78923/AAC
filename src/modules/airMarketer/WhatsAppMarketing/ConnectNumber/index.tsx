import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { styles } from './ConnectNumber.style';
import { TickListIcon, WhatsApp55Icon } from '@/assets/icons';
import { listData } from './ConnectNumber.data';
import useConnectNumber from './useConnectNumber';
import AddRegNumber from './AddRegNumber';
import OTPVerification from './OTPVerification';

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
  } = useConnectNumber();
  return (
    <>
      <Box sx={styles.header}>
        <Box sx={styles.icon}>
          <WhatsApp55Icon />
        </Box>
        <Box>
          <Typography sx={{ lineHeight: '1.25' }} variant="h3">
            WhatsApp
          </Typography>
          <Box sx={styles.headerText}>
            Connect WhatsApp Business numbers and bring all your conversation
            here
          </Box>
        </Box>
      </Box>
      <Box sx={styles.divider} />
      <Box>
        <Typography sx={{ lineHeight: '1.25' }} variant="h3">
          Get started with WhatsApp Marketing
        </Typography>
        <List>
          {listData?.map((item: any) => (
            <ListItem key={item?.id} disableGutters>
              <ListItemIcon>
                <TickListIcon />
              </ListItemIcon>
              <ListItemText sx={styles.listItemText} primary={item?.text} />
            </ListItem>
          ))}
        </List>
        <Button
          sx={{ mt: '10px' }}
          variant="contained"
          onClick={handleOpenDialogRegNumber}
        >
          Connect Your WhatsApp Account
        </Button>
      </Box>

      <AddRegNumber
        open={openDialogRegNumber}
        onClose={handleCloseDialogRegNumber}
        onSubmit={handleAddRegNumSubmit}
        onPhoneChange={handlePhoneChange}
        phoneValue={phoneNumber}
        isPhoneValid={isPhoneValid}
      />

      <OTPVerification
        open={openDialogVerification}
        onClose={handleCloseDialogVerification}
        onSubmit={() => {
          handleVerificationSubmit();
          setIsNumberConnected(true);
        }}
      />
    </>
  );
};

export default ConnectNumber;
