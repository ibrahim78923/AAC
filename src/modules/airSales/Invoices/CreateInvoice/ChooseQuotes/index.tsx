import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import SearchableSelect from '@/components/SearchableSelect';
import { quotesOptions } from './ChooseQuotes.data';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const ChooseQuotes = () => {
  const router = useRouter();
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
      <Grid container height="55vh">
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
      <Divider sx={{ backgroundColor: '#E5E7EB' }} />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        mt={2}
      >
        <Button
          variant="outlined"
          // onClick={() => setIsListView(false)}
        >
          Back
        </Button>
        <Box>
          <Stack gap="10px" direction="row">
            <Button
              variant="outlined"
              onClick={() => router.push('/air-sales/sales-invoices')}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/air-sales/sales-invoices')}
            >
              Skip
            </Button>
            <Button variant="contained">Next</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChooseQuotes;
