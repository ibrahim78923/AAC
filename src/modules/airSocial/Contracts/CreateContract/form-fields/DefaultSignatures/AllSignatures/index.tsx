import React from 'react';
import { Box, Button } from '@mui/material';
import { styles } from './AllSignatures.style';

interface AllSignatureProps {
  onClickChange?: () => void;
  signatureType?: any;
}

export default function AllSignatures({
  onClickChange,
  signatureType,
}: AllSignatureProps) {
  return (
    <Box sx={styles?.individual}>
      <Box sx={styles?.signees}>
        <Box sx={styles?.signeeName}>All Signees</Box>
      </Box>
      <Box sx={styles?.fieldActions}>
        <Box sx={styles?.signatureValue}>{signatureType}</Box>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          className="small"
          onClick={onClickChange}
        >
          Change
        </Button>
      </Box>
    </Box>
  );
}
