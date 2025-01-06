import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { styles } from './DefaultSignatures.style';
import IndividualSignature from './IndividualSignature';

interface DefaultSignaturesProps {
  signees: any;
  onClickChange: () => void;
  isIndividualSignature: boolean;
  onChangeIndividualSignature: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  setSelectedSigneeId: (id: string | null) => void;
}

export default function DefaultSignatures({
  signees,
  onClickChange,
  isIndividualSignature,
  onChangeIndividualSignature,
  setSelectedSigneeId,
}: DefaultSignaturesProps) {
  // const { isIndividualSignature, handleChangeIndividualSignature } =
  //   useDefaultSignatures();

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
              />
            }
          />
        </Box>
      </Box>

      {isIndividualSignature ? (
        <Box sx={styles?.fieldGroup}>
          {signees?.map((signee: any) => (
            <IndividualSignature
              key={signee?._id}
              isIndividualSignature={isIndividualSignature}
              setSelectedSigneeId={setSelectedSigneeId}
              signatureType="SMS Verification"
              onClickChange={onClickChange}
              signee={signee}
            />
          ))}
        </Box>
      ) : (
        <Box sx={styles?.fieldGroup}>
          <IndividualSignature
            isIndividualSignature={isIndividualSignature}
            signatureType="SMS Verification"
            onClickChange={onClickChange}
            setSelectedSigneeId={setSelectedSigneeId}
          />
        </Box>
      )}
    </Box>
  );
}
