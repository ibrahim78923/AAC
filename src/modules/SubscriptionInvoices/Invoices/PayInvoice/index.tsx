import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { PaymentMethodIcon } from '@/assets/icons';
import { PayInvoiceI } from './PayInvoice.interface';
import { styles } from './PayInvoice.style';

const PayInvoice: FC<PayInvoiceI> = ({ open, onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <CommonDrawer
      title="Pay Invoice"
      isDrawerOpen={open}
      onClose={onClose}
      footer={true}
      okText={'Pay Invoice'}
      isOk={true}
      cancelText={'Canel'}
    >
      <Typography sx={styles.invoiceDetailsTitle} variant="h5">
        Invoice Details
      </Typography>
      <Box sx={styles.iRow}>
        <Box sx={styles.iCellHead}>Air Sales Growth Plan</Box>
        <Box sx={styles.iCellHead}>£ 20.00</Box>
      </Box>

      <Box sx={{ mt: '8px' }}>
        <Box sx={styles.iCell}>Feb 02, 2023 to 02Feb, 2024</Box>
      </Box>

      <Box sx={{ mt: '24px' }}>
        <Box sx={styles.iRow}>
          <Box sx={styles.iCell}>Per User Cost</Box>
          <Box sx={styles.iCellHead}>£ 45.00</Box>
        </Box>
      </Box>

      <Box sx={{ mt: '24px' }}>
        <Box sx={styles.iRow}>
          <Box sx={styles.iCell}>Sub total</Box>
          <Box sx={styles.iCellHead}>£ 480.00</Box>
        </Box>
      </Box>

      <Box sx={{ mt: '12px' }}>
        <Box sx={styles.iRow}>
          <Box sx={styles.iCell}>Vat. (20%)</Box>
          <Box sx={styles.iCellHead}>£ 28.00</Box>
        </Box>
      </Box>

      <Box sx={{ mt: '12px' }}>
        <Box sx={styles.iRow}>
          <Box sx={styles.iCell}>Discount (10%)</Box>
          <Box sx={styles.iCellHead}>-£ 10.00</Box>
        </Box>
      </Box>

      <Divider sx={{ my: '16px', borderColor: '#D1D5DB' }} />

      <Box sx={styles.iRow}>
        <Box sx={styles.iCell}>Total</Box>
        <Box sx={styles.iCellHead}>£ 498.00</Box>
      </Box>

      <Divider sx={{ mt: '24px', mb: '20px', borderColor: '#D1D5DB' }} />

      <Box sx={styles.iCellHead}>Primary company address</Box>
      <Box sx={{ mt: '8px' }}>
        123 Lewis st,
        <br />
        Cambridge, MA 11111111 <br />
        United Kingdom, UK
      </Box>

      <Box sx={{ mt: '40px' }}>
        <Box sx={styles.iCellHead}>Payment Methods</Box>

        <List sx={styles.paymentMethods}>
          {['a'].map((value) => {
            return (
              <ListItem
                key={value}
                secondaryAction={<PaymentMethodIcon />}
                disablePadding
              >
                <ListItemButton dense>
                  <ListItemIcon>
                    <Radio
                      checked={selectedValue === value}
                      onChange={handleChange}
                      value={value}
                      name="paymentMethod"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        <Box>
                          Pablo the Cat
                          <br /> abcd-1234 1234 - 1111 <br /> 10/2020
                        </Box>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </CommonDrawer>
  );
};

export default PayInvoice;
