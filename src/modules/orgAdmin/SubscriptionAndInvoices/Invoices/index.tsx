import { Box, Grid, Button, Menu, MenuItem } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { DropdownIcon } from '@/assets/icons';
import { invoicesData } from '@/mock/modules/SubscriptionAndInvoices';
import ViewInvoices from './ViewInvoices';
import PayInvoice from './PayInvoice';
import useInvoices from './useInvoices';
import { columns } from './Invoices.data';
import CustomPagination from '@/components/CustomPagination';
import { styles } from './Invoices.style';

const Invoices = () => {
  const {
    anchorEl,
    open,
    handleActionsClick,
    handleClose,
    openViewInvoice,
    handleOpenViewInvoice,
    handleCloseViewInvoice,
    openPayInvoice,
    handleOpenPayInvoice,
    handleClosePayInvoice,
  } = useInvoices();

  return (
    <>
      <Box sx={styles.invoicesTableWrapper}>
        <Box sx={styles.invoicesHeader}>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={styles.invoicesHeaderLabel}>Invoices Due</Box>
              <Box sx={styles.invoicesHeaderValue}>1</Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={styles.invoicesHeaderLabel}>Total Balance Due</Box>
              <Box sx={styles.invoicesHeaderValue}>£ 1,234.11</Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={styles.tableToolbar}>
          <Box sx={styles.tableSearch}>
            <Search size="small" />
          </Box>
          <Box sx={styles.tableToolbarActions}>
            <Box>
              <Button
                size="small"
                onClick={handleActionsClick}
                sx={styles.actionButton}
                endIcon={<DropdownIcon />}
              >
                Actions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiList-root': {
                    minWidth: '112px',
                  },
                }}
              >
                <MenuItem onClick={handleOpenPayInvoice}>Pay Now</MenuItem>
                <MenuItem onClick={handleOpenViewInvoice}>View</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        <TanstackTable columns={columns} data={invoicesData} />

        <CustomPagination
          count={3}
          rowsPerPageOptions={[6, 10, 25, 50, 100]}
          entriePages={invoicesData.length}
        />
      </Box>

      <ViewInvoices open={openViewInvoice} onClose={handleCloseViewInvoice} />
      <PayInvoice open={openPayInvoice} onClose={handleClosePayInvoice} />
    </>
  );
};

export default Invoices;
