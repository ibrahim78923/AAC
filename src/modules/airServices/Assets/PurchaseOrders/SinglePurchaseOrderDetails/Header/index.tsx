import { Box, useTheme, Typography, Popover, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import { styles } from './Header.style';
import { useHeader } from '../../SinglePurchaseOrderDetails/Header/useHeader';

function Header({ title }: any) {
  const theme: any = useTheme();
  const {
    enqueueSnackbar,
    handleActionClick,
    actionPop,
    receivedItemsEnabled,
    setReceivedItemsEnabled,
    openAction,
    handleActionClose,
  } = useHeader();
  return (
    <Box sx={styles.mainBox}>
      <Box>
        <Typography sx={styles.typographyStyle(theme)}>{title}</Typography>
      </Box>
      <Box sx={styles.buttonBox}>
        <Button
          sx={styles.buttonStyle(theme)}
          variant="outlined"
          disabled={!receivedItemsEnabled}
        >
          Received items
        </Button>

        <Button sx={styles.buttonStyle(theme)} variant="outlined">
          Add to Inventory
        </Button>

        <Button
          sx={styles.actionbuttonStyle()}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
        >
          Open
        </Button>
        <Popover
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <>
            <MenuItem
              sx={{ p: 1 }}
              onClick={() => {
                enqueueSnackbar(
                  'Purchase Order has been successfully updated',
                  {
                    variant: 'success',
                  },
                );
                setReceivedItemsEnabled(true);
              }}
            >
              Ordered
            </MenuItem>
            <MenuItem
              onClick={() => {
                enqueueSnackbar('Purchase Order Cancelled successfully', {
                  variant: 'success',
                });
                setReceivedItemsEnabled(false);
              }}
              sx={{ p: 1 }}
            >
              Cancelled
            </MenuItem>
          </>
        </Popover>
      </Box>
    </Box>
  );
}

export default Header;
