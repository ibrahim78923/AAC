import React from 'react';

import { Grid, MenuItem, Typography, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import DealDrawer from '../DealDrawer';

import { createDealData } from './CreateDeal.data';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const CreateDeal = () => {
  const methods = useForm({});
  const theme = useTheme();

  return (
    <DealDrawer
      btnProps={{
        title: 'Creat Deal',
        startIcon: <AddCircleIcon />,
        variant: 'contained',
        sx: { height: '35px' },
      }}
      drawerProps={{
        title: 'Create Deal',
        okText: 'Submit',
        submitHandler: () => {},
      }}
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
    </DealDrawer>
  );
};

export default CreateDeal;
