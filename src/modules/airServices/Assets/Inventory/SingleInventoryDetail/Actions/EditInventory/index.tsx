import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { styles } from './EditInventory.style';
import useEditInventory from './useEditInventory';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { editInventoryFields } from './EditInventory.data';

const EditInventory = () => {
  const { methods, submit } = useEditInventory();
  const { flexBetween, mainWrapper, mainHeading } = styles();
  return (
    <Box>
      <Box sx={{ ...mainWrapper }}>
        <Box sx={{ ...flexBetween, display: 'inline-flex', pb: 1.4, gap: 1.4 }}>
          <Typography variant="h4" sx={mainHeading}>
            Add New
          </Typography>
        </Box>
        <FormProvider
          methods={methods}
          onSubmit={methods?.handleSubmit(submit)}
        >
          <Grid container rowSpacing={1.8}>
            <Grid
              item
              xs={12}
              lg={9}
              container
              rowSpacing={1.8}
              columnSpacing={3}
              mt={-1}
            >
              {editInventoryFields?.map((form: any) => {
                return (
                  <Grid item xs={12} md={form?.gridLength} key={uuidv4()}>
                    <form.component {...form.componentProps} size="small">
                      {form?.componentProps?.select
                        ? form.componentProps.options.map((option: any) => (
                            <option key={uuidv4()} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : form?.heading
                        ? form?.heading
                        : null}
                    </form.component>
                  </Grid>
                );
              })}
            </Grid>
            <Grid>
              <RHFDropZone />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => methods.reset()}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              save
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default EditInventory;
