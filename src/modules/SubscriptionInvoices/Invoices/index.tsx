import React, { useState } from 'react';
import { Box, Checkbox, Grid, Button, Menu, MenuItem } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { DropdownIcon } from '@/assets/icons';
import { invoicesData } from '@/mock/modules/SubscriptionAndInvoices';
import ViewInvoices from './ViewInvoices';
import { styles } from './Invoices.style';
import PayInvoice from './PayInvoice';

const Invoices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openViewInvoice, setOpenViewInvoice] = useState(false);
  const [openPayInvoice, setOpenPayInvoice] = useState(false);

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenViewInvoice = () => {
    setOpenViewInvoice(true);
    handleClose();
  };
  const handleCloseViewInvoice = () => {
    setOpenViewInvoice(false);
  };

  const handleOpenPayInvoice = () => {
    setOpenPayInvoice(true);
    handleClose();
  };
  const handleClosePayInvoice = () => {
    setOpenPayInvoice(false);
  };

  const columns: any = [
    {
      accessorFn: (row: any) => row.id,
      id: 'cellCheckbox',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="cellCheckbox" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.product,
      id: 'products',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info.getValue()}
          </Box>
          <Box>{info.row.original.plan}</Box>
        </>
      ),
      header: 'Products',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row.dateIssued,
      id: 'dateIssued',
      isSortable: true,
      header: 'Date Issued',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.invoiceNumber,
      id: 'invoiceNumber',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => (
        <>
          <Box>Invoice # {info.getValue()}</Box>
          <Box>Due date: {info.row.original.dueDate}</Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row.invoiceAmount,
      id: 'invoiceAmount',
      isSortable: true,
      header: 'Invoice amount',
      cell: (info: any) => <>£ {info.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row.invoiceBalance,
      id: 'invoiceBalance',
      isSortable: true,
      header: 'Invoice balance',
      cell: (info: any) => <>£ {info.getValue()}</>,
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <Box sx={styles.chip}>{info.getValue()}</Box>,
    },
  ];

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
            <Search />
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
      </Box>

      <ViewInvoices open={openViewInvoice} onClose={handleCloseViewInvoice} />
      <PayInvoice open={openPayInvoice} onClose={handleClosePayInvoice} />
    </>
  );
};

export default Invoices;
