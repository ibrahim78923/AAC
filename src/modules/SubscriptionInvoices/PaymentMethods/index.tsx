import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import AddCard from './AddCard';
import { DropdownIcon } from '@/assets/icons';
import { paymentData } from '@/mock/modules/SubscriptionAndInvoices';
import { styles } from './PaymentMethod.style';
import { AlertModals } from '@/components/AlertModals';
import EditCard from './EditCard';

const PaymentMethods = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openEditCard, setOpenEditCard] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenAddCard = () => {
    setOpenAddCard(true);
  };
  const handleCloseAddCard = () => {
    setOpenAddCard(false);
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
    handleClose();
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenEditCard = () => {
    setOpenEditCard(true);
    handleClose();
  };
  const handleCloseEditCard = () => {
    setOpenEditCard(false);
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
      accessorFn: (row: any) => row.name,
      id: 'name',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info.getValue()}
          </Box>
          <Box>{info.row.original.plan}</Box>
        </>
      ),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row.billingAddress,
      id: 'billingAddress',
      isSortable: true,
      header: 'Billing Address',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.expirationDate,
      id: 'expirationDate',
      isSortable: true,
      header: 'expirationDate',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.product,
      id: 'product',
      isSortable: true,
      header: 'Product',
      cell: (info: any) => info.getValue(),
    },
  ];

  return (
    <>
      <Box sx={styles.paymentsTableWrapper}>
        <Box sx={styles.paymentsHeader}>
          <Typography variant="h4" sx={styles.paymentTitle}>
            Payment Methods
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddCard}
          >
            Add a card
          </Button>
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
                <MenuItem onClick={handleOpenEditCard}>Edit</MenuItem>
                <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        <TanstackTable columns={columns} data={paymentData} />
      </Box>

      <AddCard open={openAddCard} onClose={handleCloseAddCard} />
      <EditCard open={openEditCard} onClose={handleCloseEditCard} />
      <AlertModals
        message="Are you sure you want to delete this payment method?"
        type="delete"
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleCloseDeleteModal}
      />
    </>
  );
};

export default PaymentMethods;
