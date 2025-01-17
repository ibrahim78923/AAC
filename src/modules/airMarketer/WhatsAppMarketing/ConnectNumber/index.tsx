import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styles } from './ConnectNumber.style';
import { TickListIcon, WhatsApp55Icon } from '@/assets/icons';
import useConnectNumber from './useConnectNumber';
import AddRegNumber from './AddRegNumber';
import { listData } from './ConnectNumber.data';

const ConnectNumber = ({}: any) => {
  const {
    handleCloseDialogRegNumber,
    handleOpenDialogRegNumber,
    connectNumberLoading,
    openDialogRegNumber,
    handlePhoneChange,
    isPhoneValid,
    phoneNumber,
    setPhoneNumber,
  } = useConnectNumber();

  return (
    <>
      <Box sx={styles?.header}>
        <Box sx={styles?.icon}>
          <WhatsApp55Icon />
        </Box>
        <Box>
          <Typography sx={{ lineHeight: '1.25' }} variant="h3">
            WhatsApp
          </Typography>
          <Box sx={styles?.headerText}>
            Connect WhatsApp Business numbers and bring all your conversation
            here
          </Box>
        </Box>
      </Box>
      <Box sx={styles?.divider} />
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
              <ListItemText sx={styles?.listItemText} primary={item?.text} />
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

      {openDialogRegNumber && (
        <AddRegNumber
          open={openDialogRegNumber}
          onClose={handleCloseDialogRegNumber}
          onPhoneChange={handlePhoneChange}
          phoneValue={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isPhoneValid={isPhoneValid}
          isLoading={connectNumberLoading}
        />
      )}
    </>
  );
};

export default ConnectNumber;
