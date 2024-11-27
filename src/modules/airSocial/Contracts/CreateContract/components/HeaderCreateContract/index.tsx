import { Box, Button, Divider } from '@mui/material';
import React from 'react';
import { styles } from './HeaderCreateContract.style';
import {
  IconPlainBack,
  IconContractShare,
  IconContractMore,
} from '@/assets/icons';

interface HeaderCreateContractProps {
  onClickShare?: () => void;
  onClickMore?: () => void;
  onClickSave?: () => void;
  onClickSign?: () => void;
}

export default function HeaderCreateContract({
  onClickShare,
  onClickMore,
  onClickSave,
  onClickSign,
}: HeaderCreateContractProps) {
  return (
    <Box sx={styles.toolbar}>
      <Box sx={styles.left}>
        <Box sx={styles.backButton}>
          <IconPlainBack />
        </Box>

        <Box sx={styles.headerTitle}>Untitled Draft</Box>

        <Box sx={styles.statusBadge}>Draft</Box>
      </Box>

      <Box sx={styles.right}>
        <Button
          onClick={onClickShare}
          startIcon={<IconContractShare />}
          variant="outlined"
          color="secondary"
          className="small"
        >
          Share
        </Button>

        <Button
          onClick={onClickMore}
          variant="outlined"
          color="secondary"
          className="small"
        >
          <IconContractMore />
        </Button>

        <Divider orientation="vertical" flexItem />

        <Button
          onClick={onClickSave}
          variant="outlined"
          color="secondary"
          className="small"
        >
          Save Changes
        </Button>

        <Button
          onClick={onClickSign}
          variant="contained"
          color="primary"
          className="small"
        >
          Sign & Send
        </Button>
      </Box>
    </Box>
  );
}
