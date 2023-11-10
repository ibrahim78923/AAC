import React from 'react';
import { SettingsIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { DraftData } from './draft.data';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './draft.styles';

const Draft = () => {
  const methods = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    values;
  };

  return (
    <Box>
      <Box sx={styles?.draftMainWrap}>
        <Search size="small" placeholder="Search Here" />
        <Box>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            sx={{ mr: '15px' }}
          >
            Email Setting
          </Button>
          <Button variant="contained" endIcon={<KeyboardArrowRight />}>
            Send Email
          </Button>
        </Box>
      </Box>
      <Box sx={styles?.draftWrap}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {DraftData.map((data: any) => (
              <Grid
                item
                key={uuidv4()}
                md={data?.gridLength}
                xs={12}
                sx={data?.sx}
              >
                <Typography>{data?.title}</Typography>
                <data.component {...data.componentProps}>
                  {data?.componentProps?.select
                    ? data?.options?.map((option: any) => (
                        <MenuItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))
                    : null}
                </data.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Draft;
