import { styles } from './AddInventory.style';
import { useAddInventory } from './useAddInventory';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { addInventoryFields } from './AddInventory.data';

const AddInventory = () => {
  const { methods, submit, formType, setFormType, query } = useAddInventory();
  const { mainWrapper, mainHeading, buttonWrapper } = styles;

  useEffect(() => {
    setFormType(query?.type);
  }, [query?.update]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods?.handleSubmit(submit)}>
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item lg={9}>
            <Box sx={mainWrapper}>
              <Typography variant="h4" sx={mainHeading}>
                Add New
              </Typography>
              <Grid item container xs={12} overflow="scroll">
                <Grid container rowSpacing={1.8} columnSpacing={3}>
                  {addInventoryFields?.map((form: any) => (
                    <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                      <form.component {...form?.componentProps} size="small">
                        {form?.componentProps?.select
                          ? form?.componentProps?.options?.map(
                              (option: any) => (
                                <option key={uuidv4()} value={option?.value}>
                                  {option?.label}
                                </option>
                              ),
                            )
                          : form?.heading
                          ? form?.heading
                          : null}
                      </form.component>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name="file" />
              </Box>
            </Box>
            <Box sx={buttonWrapper}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => methods?.reset()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ paddingX: '25px' }}
              >
                {formType || 'save'}
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RHFDropZone name="file" />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default AddInventory;
