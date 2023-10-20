import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { styles } from './StepLineItems.style';
import { tableColumns } from './StepLineItems.data';
import { lineItemsData } from '@/mock/modules/Quotes';
import Search from '@/components/Search';
import { AddCircleSmallIcon } from '@/assets/icons';

const StepLineItems = () => {
  return (
    <>
      <Box sx={styles.TableWrapper}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageHeaderTitle}>
            Products
          </Typography>
          <Stack direction="row" spacing={'12px'}>
            <Search size="small" placeholder="Search Here" />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleSmallIcon />}
            >
              Add Products
            </Button>
          </Stack>
        </Box>
        <TanstackTable columns={tableColumns} data={lineItemsData} />
      </Box>

      <Box sx={styles.voucherCont}>
        <Box sx={styles.voucher}>
          <Box sx={styles.voucherHeader}>
            <Box sx={styles.vHeadCell}>Subtotal:</Box>
            <Box sx={styles.vHeadCell}>£75</Box>
          </Box>

          <Box sx={styles.voucherBody}>
            <Box sx={styles.vRow}>
              <Box sx={styles.bodyCell}>V.A.T %</Box>
              <Box sx={styles.bodyCellH}>£ 20</Box>
            </Box>
            <Box sx={styles.vRow}>
              <Box sx={styles.bodyCell}>Unit Discount</Box>
              <Box sx={styles.bodyCellH}>£ 30</Box>
            </Box>
            <Box sx={styles.vRow}>
              <Box sx={styles.bodyCell}>Total Discount</Box>
              <Box sx={styles.bodyCellH}>£ 5</Box>
            </Box>
          </Box>

          <Box sx={styles.voucherFooter}>
            <Box sx={styles.fCell}>Total</Box>
            <Box sx={styles.fCell}>£50</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepLineItems;
