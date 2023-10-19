import React from 'react';

import { Grid, MenuItem, Typography, useTheme } from '@mui/material';

import DealDrawer from '../DealDrawer';

import { FilterData } from './DealFilterDrawer.data';

import { FormProvider } from '@/components/ReactHookForm';

import { FilterIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

const DealFilterDrawer = () => {
  const theme = useTheme();
  const methods = useForm({});

  return (
    <DealDrawer
      btnProps={{
        title: 'Filter',
        startIcon: <FilterIcon />,
        sx: { height: '30px' },
      }}
      drawerProps={{
        title: 'Filter',
        okText: 'Submit',
        submitHandler: () => {},
      }}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {FilterData.map((obj) => (
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

export default DealFilterDrawer;
