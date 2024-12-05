import React from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { styles } from './IndividualSignature.style';

interface IndividualSignatureProps {
  isIndividualSignature: boolean;
  onClickChange: () => void;
  signatureType: string;
  signee?: any;
}

export default function IndvidualSignature({
  isIndividualSignature,
  onClickChange,
  signee,
  signatureType,
}: IndividualSignatureProps) {
  return (
    <Box sx={styles?.individual}>
      <Box sx={styles?.signees}>
        {isIndividualSignature && (
          <Avatar
            alt={signee?.firstName ?? '' + ' ' + signee?.lastName ?? ''}
            src=""
            sx={{
              width: 36,
              height: 36,
              backgroundColor: 'primary.main',
              fontSize: 14,
            }}
          >
            RS
          </Avatar>
        )}

        <Box sx={styles?.signeeName}>
          {isIndividualSignature
            ? `${signee?.firstName} ${signee?.lastName}`
            : 'All Signees'}
        </Box>
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
