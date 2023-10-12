import React from 'react';
import DealDrawer from '../DealDrawer';
import { Grid, MenuItem, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { createDealData } from './CreateDeals.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateDeal = () => {
  const methods = useForm({});

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
                sx={{
                  color: '#4B5563',
                  fontSize: '14px',
                  fontWeight: 500,
                  mb: 0.2,
                }}
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
