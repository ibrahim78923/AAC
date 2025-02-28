import React from 'react';
import { Box, Button } from '@mui/material';
import { styles } from './Topbar.style';

export default function Topbar() {
  return (
    <Box sx={styles.toolbar}>
      <Box sx={styles.left}>
        <Box sx={styles.headerTitle}>Untitled Contract</Box>

        <Box sx={styles.statusBadge}>Pending</Box>
      </Box>

      <Box sx={styles.right}>
        <Button variant="contained" color="primary" className="small">
          Sign & Send
        </Button>
      </Box>
    </Box>
  );
}
