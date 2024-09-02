import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import Customizations from './Customizations';
import Preview from './Preview';
import useCustomizePortal from './useCustomizePortal';

const CustomizePortal = () => {
  const {
    watch,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    customizationsDataArray,
  } = useCustomizePortal();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Box
          border={1}
          borderColor={'grey.700'}
          p={2}
          borderRadius={4}
          maxHeight={'65vh'}
          overflow={'auto'}
        >
          <Typography variant={'h3'} color={'blue.main'} mb={2}>
            Preview
          </Typography>
          <Preview watch={watch} />
        </Box>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Box
          border={1}
          borderColor={'grey.700'}
          p={2}
          borderRadius={4}
          maxHeight={'65vh'}
          overflow={'auto'}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Customizations
              reset={reset}
              customizationsDataArray={customizationsDataArray}
            />
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomizePortal;
