import { Typography } from '@mui/material';
import { existingProductsFields } from './AddProduct.data';
import SearchableSelect from '@/components/SearchableSelect';
import { useForm } from 'react-hook-form';

const ExistingProducts = () => {
  const {
    control,
    formState: { errors },
  } = useForm();

  const renderCustomOption = (option: any) => {
    return (
      <Typography variant="h6">
        {option.label} {option.name}
      </Typography>
    );
  };

  return (
    <SearchableSelect
      dropdownData={existingProductsFields}
      renderOption={renderCustomOption}
      name="Search candidate"
      label="Search"
      control={control}
      rules={{ required: 'required field' }}
      error={!!errors.message}
    />
  );
};

export default ExistingProducts;
