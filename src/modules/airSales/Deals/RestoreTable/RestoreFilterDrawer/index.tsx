import React from 'react';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { useForm } from 'react-hook-form';

const RestoreFilterDrawer = ({ open, onClose }: any) => {
  const methods = useForm({});

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
    >
      <FormProvider methods={methods}>
        {/* <Grid container spacing={2}>
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
          ))} */}
        {/* </Grid> */}
      </FormProvider>
    </CommonDrawer>
  );
};

export default RestoreFilterDrawer;
