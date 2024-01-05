import { useUpsertInventory } from './useUpsertInventory';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { addInventoryFields } from './UpsertInventory.data';
import { LoadingButton } from '@mui/lab';

export const UpsertInventory = () => {
  const { methods, submit, theme, formType, setFormType, query } =
    useUpsertInventory();

  useEffect(() => {
    setFormType(query?.type);
  }, [query?.update]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods?.handleSubmit(submit)}>
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item lg={9}>
            <Box
              p={2}
              borderRadius={3}
              border={`2px solid ${theme?.palette?.custom?.off_white_three}`}
            >
              <Typography variant="h3" color="slateblue.main">
                Add New
              </Typography>
              <br />
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
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              gap={2}
              mt={2}
            >
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={() => methods?.reset()}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ paddingX: '25px' }}
              >
                {formType || 'save'}
              </LoadingButton>
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
