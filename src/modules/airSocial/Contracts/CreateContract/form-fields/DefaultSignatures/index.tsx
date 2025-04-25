import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { styles } from './DefaultSignatures.style';
import IndividualSignature from './IndividualSignature';
import AllSignatures from './AllSignatures';

interface DefaultSignaturesProps {
  signees: any;
  onClickChange?: () => void;
  isIndividualSignature: boolean;
  onChangeIndividualSignature: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  setSelectedSigneeIndex: (id: number | null) => void;
  preview?: boolean;
}

export default function DefaultSignatures({
  signees,
  onClickChange,
  isIndividualSignature,
  onChangeIndividualSignature,
  setSelectedSigneeIndex,
  preview = false,
}: DefaultSignaturesProps) {
  return (
    <Box>
      <Box sx={styles?.labelWrapper}>
        <Box sx={styles.label}>Default Signatures</Box>
        <Box>
          <FormControlLabel
            label="Enable individual signature types"
            control={
              <Switch
                checked={isIndividualSignature}
                onChange={onChangeIndividualSignature}
                inputProps={{ 'aria-label': 'signature-types' }}
                disabled={preview}
              />
            }
          />
        </Box>
      </Box>

      {isIndividualSignature ? (
        <Box sx={styles?.fieldGroup}>
          {signees?.map((signee: any, index: number) => (
            <IndividualSignature
              key={signee?._id || signee?.id}
              setSelectedSigneeIndex={setSelectedSigneeIndex}
              onClickChange={onClickChange}
              signee={{ ...signee }}
              index={index}
            />
          ))}
        </Box>
      ) : (
        <Box sx={styles?.fieldGroup}>
          <AllSignatures
            onClickChange={onClickChange}
            signatureType={signees[0]?.signatureType}
          />
        </Box>
      )}
    </Box>
  );
}
