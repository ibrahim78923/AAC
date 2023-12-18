import { useState } from 'react';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { productData } from '../ImportModal.data';
import CheckboxCard from '../CheckboxCard';

const FirstStep = () => {
  const [value, setValue] = useState('');
  const handleSelect = (selectedValue: any) => {
    setValue(selectedValue);
  };

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Select Product and Object you’d like to Import
      </Typography>
      <Box my={2.4}>
        <RHFAutocomplete
          name="product"
          label="Product"
          size="small"
          placeholder="Select product"
          options={[]}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.2,
        }}
      >
        {productData?.map?.((card) => (
          <CheckboxCard
            key={card?.title}
            {...card}
            value={value}
            handleSelect={handleSelect}
          />
        ))}
      </Box>
    </>
  );
};

export default FirstStep;
