import { Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import useChooseQuotes from './useChooseQuotes';
import { FormProvider, RHFSearchableSelect } from '@/components/ReactHookForm';

const ChooseQuotes = () => {
  const { dataQuotes, methodRequest } = useChooseQuotes();
  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <Box my={2} className="stepper-content">
      <Grid container>
        <Grid xs={12} md={4}>
          <FormProvider methods={methodRequest}>
            <RHFSearchableSelect
              name="quotes"
              label="Select Quotes"
              control={control}
              rules={{ required: 'required field' }}
              error={!!errors.message}
              options={(dataQuotes?.length ? dataQuotes : []).map(
                (quote: any) => ({
                  value: quote?._id,
                  label: `${quote?.name || 'Unknown Name'}`,
                }),
              )}
            />
          </FormProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChooseQuotes;
