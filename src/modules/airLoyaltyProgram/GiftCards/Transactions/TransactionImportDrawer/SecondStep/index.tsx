import { InfoCircleGreenIcon } from '@/assets/icons';
import { Box, Grid, Typography } from '@mui/material';
import { productData } from '../ImportModal.data';
import { useState } from 'react';
import CheckboxCard from '../CheckboxCard';

const SecondStep = () => {
  const [value, setValue] = useState('');
  const handleSelect = (selectedValue: any) => {
    setValue(selectedValue);
  };
  return (
    <Grid container>
      <Box>
        <Typography fontWeight={600} color="custom.main" pt={1.6}>
          Map Your data
        </Typography>
        <Typography
          variant="body4"
          fontWeight={500}
          color="custom.main"
          pt={1.6}
        >
          Columns should be assigned to attributes
        </Typography>
      </Box>
      <Box
        alignItems={'center'}
        display={'flex'}
        bgcolor="success.lighter"
        my={1.4}
        px={1}
        gap={1}
        borderRadius={2}
      >
        <InfoCircleGreenIcon />
        <Typography variant="body2">
          To proceed, you must map “Card Number, Amount & Email”.
        </Typography>
      </Box>
      <Grid item md={12}>
        {productData?.map?.((card) => (
          <CheckboxCard
            key={card?.title}
            {...card}
            value={value}
            handleSelect={handleSelect}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default SecondStep;
