import React, { memo } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { styles } from './IndividualSignature.style';

interface IndividualSignatureProps {
  setSelectedSigneeId: (id: string | null) => void;
  onClickChange?: () => void;
  signee?: any;
}

const IndvidualSignature = memo(
  ({
    setSelectedSigneeId,
    onClickChange,
    signee,
  }: IndividualSignatureProps) => {
    const getAvatarPlaceholder = (name: string) => {
      return name
        ?.split(' ')
        ?.map((n: string) => n.charAt(0))
        ?.join('')
        ?.slice(0, 2);
    };

    return (
      <Box sx={styles?.individual}>
        <Box sx={styles?.signees}>
          <Avatar
            alt={signee?.name}
            src=""
            sx={{
              width: 36,
              height: 36,
              backgroundColor: 'primary.main',
              fontSize: 14,
              textTransform: 'uppercase',
            }}
          >
            {getAvatarPlaceholder(signee?.name)}
          </Avatar>

          <Box sx={styles?.signeeName}>{signee?.name}</Box>
        </Box>
        <Box sx={styles?.fieldActions}>
          <Box sx={styles?.signatureValue}>{signee?.signatureType}</Box>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            className="small"
            onClick={() => {
              setSelectedSigneeId(signee?._id || null);
              onClickChange?.();
            }}
          >
            Change
          </Button>
        </Box>
      </Box>
    );
  },
);

IndvidualSignature.displayName = 'IndvidualSignature';
export default IndvidualSignature;
