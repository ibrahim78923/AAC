import { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
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

const AddProducts = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const [value, setValue] = useState('customLineItem');

  // handle radio change value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event?.target as HTMLInputElement)?.value);
  };

  // handle submit values
  const onSubmit = () => {};

  const existingItemMethods: any = useForm({
    resolver: yupResolver(existingProductsValidationSchema),
    defaultValues: existingProductsDefaultValues,
  });
  const CustomItemsMethods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });

  const isCustom =
    value === 'customLineItem' ? CustomItemsMethods : existingItemMethods;
  const { handleSubmit } = isCustom;

  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create Product"
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
