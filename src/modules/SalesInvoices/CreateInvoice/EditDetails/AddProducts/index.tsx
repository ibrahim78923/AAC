import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { PlusSharedIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import CustomLineItem from './CustomLineItem';
import ExistingProducts from './ExistingProducts';
import {
  customDefaultValues,
  customValidationSchema,
  existingProductsDefaultValues,
  existingProductsValidationSchema,
} from './AddProduct.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const AddProducts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = useState('customLineItem');

  // handle radio change value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  // handle submit values
  const onSubmit = () => {
    // console.log(data);
  };

  const methods: any = useForm({
    resolver: yupResolver(existingProductsValidationSchema),
    defaultValues: existingProductsDefaultValues,
  });
  const myMethods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });

  const isCustom = value === 'customLineItem' ? myMethods : methods;
  const { handleSubmit } = isCustom;

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ display: 'flex', gap: '10px' }}
        startIcon={<PlusSharedIcon />}
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Products
      </Button>

      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create Products"
        isOk={true}
        okText="Add"
        cancelText="Cancel"
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            row
            value={value}
            onChange={handleChange}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <FormControlLabel
              value="customLineItem"
              control={<Radio />}
              label="Custom Line Item"
            />
            <FormControlLabel
              value="existingProducts"
              control={<Radio />}
              label="Existing Products"
            />
          </RadioGroup>
        </FormControl>

        <Box mt={3}>
          {value === 'customLineItem' ? (
            <CustomLineItem methods={isCustom} />
          ) : (
            <ExistingProducts methods={isCustom} />
          )}
        </Box>
      </CommonDrawer>
    </Box>
  );
};

export default AddProducts;
