import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import SearchableSelect from '@/components/SearchableSelect';
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
    <Box>
      <Grid container height="55vh">
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
