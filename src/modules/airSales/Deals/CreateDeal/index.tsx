import React from 'react';

import { Grid, MenuItem, Typography, useTheme } from '@mui/material';

import { createDealData } from './CreateDeal.data';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const CreateDeal = ({ open, onClose }: any) => {
  const methods = useForm({});
  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Deal"
      footer
      okText="Submit"
      isOk
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {createDealData.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <Typography
                variant="body4"
                sx={{ colors: theme.palette.grey[600] }}
              >
                {obj.title}
              </Typography>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj.componentProps}
              >
                {obj.componentProps.select
                  ? obj.options?.map((option) => (
                      <MenuItem key={uuidv4()} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateDeal;
