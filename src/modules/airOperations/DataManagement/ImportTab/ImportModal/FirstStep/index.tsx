import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import CheckboxCard from '../CheckboxCard';
import { useFirstStep } from './useFirstStep';
import { importField, productData } from './FirstStep.data';

const FirstStep = () => {
  const { handleSelect, value, handleSubmit, onSubmit, methods } =
    useFirstStep();

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Select Product and Object you’d like to Import
      </Typography>
      <Box my={2.4}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {importField?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
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
