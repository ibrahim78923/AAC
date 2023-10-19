import { Box, useTheme, Typography, Popover, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import { styles } from './AssetHead.style';
// import { enqueueSnackbar } from 'notistack';
import { useRelatedTickets } from '../../SinglePurchaseOrderDetails/AssetHead/useRelatedTickets';

function AssetHead({ title }: any) {
  const theme: any = useTheme();
  const {
    enqueueSnackbar,
    handleActionClick,
    // actionExportPop,
    actionPop,
    setActionPop,
    receivedItemsEnabled,
    setReceivedItemsEnabled,
    // handleOrderItem,
    // handleCancelItem,
    // handleActionExportClose,
    openAction,
    // handleActionExportClick,
    handleActionClose,
    // openActionExport,
  } = useRelatedTickets();
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

        <Button
          sx={styles.buttonStyle(theme)}
          variant="outlined"
          // disabled={!ReceivedItemsEnabled}
        >
          Add to Inventory
        </Button>

        {/* <Button
          sx={styles.actionbuttonStyle(theme)}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
        >
          Open
        </Button>
        <Popover
          open={openAction}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem
            sx={{ p: 1 }}
            onClick={() => {
              setReceivedItemsEnabled(true);
              enqueueSnackbar('child ticket deleted successfully', {
                variant: 'success',
              });
            }}
          >
            Ordered
          </MenuItem>
          <MenuItem
            onClick={() => {
              setReceivedItemsEnabled(false);
              setIsDrawerOpen(true),
                setActionPop(null);
            }}
            sx={{ p: 1 }}
          >
            Cancelled
          </MenuItem>

        </Popover> */}

        <Button
          sx={styles.actionbuttonStyle()}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
        >
          Action
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
                enqueueSnackbar('child ticket deleted successfully', {
                  variant: 'success',
                });
                setReceivedItemsEnabled(true);
              }}
            >
              Ordered
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActionPop(null);
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

export default AssetHead;
