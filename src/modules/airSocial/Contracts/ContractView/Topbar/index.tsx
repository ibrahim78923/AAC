import React from 'react';
import { Box, Button } from '@mui/material';
import { styles } from './Topbar.style';
import { ENUM_CONTRACT_STATUS } from '@/utils/contracts';

interface TopbarProps {
  title: string;
  status: string;
  handleOpenModalSignAndSend: () => void;
}

export default function Topbar({
  title,
  status,
  handleOpenModalSignAndSend,
}: TopbarProps) {
  return (
    <Box sx={styles.toolbar}>
      <Box sx={styles.left}>
        <Box sx={styles.headerTitle}>{title}</Box>

        <Box sx={styles.statusBadge(status)}>{status}</Box>
      </Box>

      <Box sx={styles.right}>
        {status === ENUM_CONTRACT_STATUS?.PENDING && (
          <Button
            onClick={handleOpenModalSignAndSend}
            variant="contained"
            color="primary"
            className="small"
          >
            Sign & Send
          </Button>
        )}
      </Box>
    </Box>
  );
}
