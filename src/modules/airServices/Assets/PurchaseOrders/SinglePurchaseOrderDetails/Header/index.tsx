import { Box, useTheme, Typography, Popover, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { ActionButtonIcon, ViewDetailBackArrowIcon } from '@/assets/icons';
import { styles } from './Header.style';
import { useHeader } from '../../SinglePurchaseOrderDetails/Header/useHeader';
import { AlertModals } from '@/components/AlertModals';
import Link from 'next/link';
import { RecievedItemDrawer } from './RecievedItems/RecievedItemDrawer';
import { AddToInventoryDrawer } from './AddToInventory/AddToInventoryDrawer';

function Header() {
  const theme: any = useTheme();
  const {
    enqueueSnackbar,
    handleActionClick,
    actionPop,
    receivedItemsEnabled,
    setReceivedItemsEnabled,
    openAction,
    handleActionClose,
    selectedMenuItemText,
    setSelectedMenuItemText,
    handleActionClicAction,
    actionButtonPop,
    openActionButton,
    handleActionCloseButton,
    setReceivedActionItemsEnabled,
    selectedMenuItemAction,
    setSelectedMenuItemAction,
    isPurchaseDeleteModal,
    setIsPurchaseDeleteModal,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
    setActionPop,
  } = useHeader();
  return (
    <Box sx={styles.mainBox}>
      <Box>
        <Typography sx={styles.typographyStyle(theme)}>
          <ViewDetailBackArrowIcon />
          <span>Dell Purchase Order Details</span>
        </Typography>
      </Box>
      <Box sx={styles.buttonBox}>
        <Button
          sx={styles.buttonStyle(theme)}
          variant="outlined"
          disabled={!receivedItemsEnabled}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          Received items
        </Button>

        <RecievedItemDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <Button
          sx={styles.buttonStyle(theme)}
          variant="outlined"
          onClick={() => setIsADrawerOpen(!isADrawerOpen)}
        >
          Add to Inventory
        </Button>

        <AddToInventoryDrawer
          isADrawerOpen={isADrawerOpen}
          setIsADrawerOpen={setIsADrawerOpen}
        />
        <Button
          sx={styles.actionbuttonStyle()}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
        >
          {selectedMenuItemText || 'Received items'}
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
                setSelectedMenuItemText('Ordered');
                setActionPop(null);
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
                setSelectedMenuItemText('Cancelled');
                setActionPop(null);
              }}
              sx={{ p: 1 }}
            >
              Cancelled
            </MenuItem>
          </>
        </Popover>
        <AlertModals
          message={'Are you sure you want to delete this Perchase Order ?'}
          type="delete"
          open={isPurchaseDeleteModal}
          handleClose={() => setIsPurchaseDeleteModal(false)}
          handleSubmit={() => setIsPurchaseDeleteModal(false)}
        />
        <Button
          sx={styles.actionbuttonStyle()}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClicAction}
        >
          {selectedMenuItemAction || 'Action'}
        </Button>

        <Popover
          open={openActionButton}
          anchorEl={actionButtonPop}
          onClose={handleActionCloseButton}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <>
            <Link href="/air-services/assets/purchase-orders/new-purchase?type=edit">
              <MenuItem
                sx={{ p: 1 }}
                onClick={() => {
                  setReceivedActionItemsEnabled(true);
                  setSelectedMenuItemAction('Edit');
                  setActionPop(null);
                }}
              >
                Edit
              </MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                setReceivedActionItemsEnabled(false);
                setSelectedMenuItemAction('Delete');
                setIsPurchaseDeleteModal(true);
                setActionPop(null);
              }}
              sx={{ p: 1 }}
            >
              Delete
            </MenuItem>
          </>
        </Popover>
      </Box>
    </Box>
  );
}

export default Header;
