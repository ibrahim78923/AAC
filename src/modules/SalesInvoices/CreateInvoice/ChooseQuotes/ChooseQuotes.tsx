import { Grid, Typography } from '@mui/material';
import SearchableSelect from '@/components/SearchableSelect';
import { useForm } from 'react-hook-form';

const ChooseQuotes = () => {
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

  const options = [
    { label: 'Opton 1', value: 'Opton 1' },
    { label: 'Opton 2', value: 'Opton 2' },
    { label: 'Opton 3', value: 'Opton 3' },
    { label: 'Opton 4', value: 'Opton 4' },
    { label: 'Opton 5', value: 'Opton 5' },
    { label: 'Opton 6', value: 'Opton 6' },
    { label: 'Opton 7', value: 'Opton 7' },
    { label: 'Opton 8', value: 'Opton 8' },
  ];

  return (
    <Grid container>
      <Grid xs={12} md={4}>
        <SearchableSelect
          dropdownData={options}
          renderOption={renderCustomOption}
          name="Search candidate"
          label="Select Quotes"
          control={control}
          rules={{ required: 'required field' }}
          error={!!errors.message}
        />
      </Grid>
    </Grid>
  );
};

export default ChooseQuotes;
