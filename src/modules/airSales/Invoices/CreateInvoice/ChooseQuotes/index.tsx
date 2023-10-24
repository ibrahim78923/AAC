import { Box, Grid, Typography } from '@mui/material';
import { quotesOptions } from './ChooseQuotes.data';
import useCreateInvoices from '../useCreateInvoices';
import SearchableSelect from '@/components/SearchableSelect';
import { useForm } from 'react-hook-form';

const ChooseQuotes = () => {
  const { activeStep } = useCreateInvoices();

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
    <Box>
      <Grid container height={activeStep === 0 ? '55vh' : '10vh'}>
        <Grid xs={12} md={4}>
          <SearchableSelect
            dropdownData={quotesOptions}
            renderOption={renderCustomOption}
            name="Search candidate"
            label="Select Quotes"
            control={control}
            rules={{ required: 'required field' }}
            error={!!errors.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChooseQuotes;
