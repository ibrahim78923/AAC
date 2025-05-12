import React from 'react';
import { Box, Grid, Radio } from '@mui/material';
import { styles } from './CardSignature.style';
import { SignDrawImg, SignOtherImg } from '@/assets/images';
import Image from 'next/image';

// interface SignOption {
//   media: React.ReactNode | string;
//   value: string;
//   label: string;
//   description?: string;
// }

interface CardSignatureProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  {
    media: SignDrawImg,
    value: 'drawSign',
    label: 'Draw to sign',
    description:
      'Place signature blocks on the PDF and sign with a hand drawn signature. Add text fields to the PDF.',
  },
  {
    media: SignOtherImg,
    value: 'otherSign',
    label: 'Use other methods',
    description:
      'Upload a PDF as an attachment and choose from a variety of signing methods.',
  },
];

export default function CardSignature({ value, onChange }: CardSignatureProps) {
  const handleCardClick = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <Grid container spacing={'24px'}>
      {options?.map((option) => (
        <Grid item xs={12} md={6} key={option?.value}>
          <Box onClick={() => handleCardClick(option.value)} sx={styles?.card}>
            <Box sx={styles?.cardMedia}>
              <Box sx={styles?.mediaInner}>
                <Image src={option.media} alt={option.label} />
              </Box>
            </Box>

            <Box sx={styles?.cardBody}>
              <Box>
                <Radio
                  checked={value === option.value}
                  value={option.value}
                  onChange={(e) => handleCardClick(e.target.value)}
                  sx={{ padding: 0 }}
                />
              </Box>
              <Box>
                <Box sx={styles.cardLabel}>{option.label}</Box>
                <Box sx={styles.cardText}>{option.description}</Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
