import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { styles } from './ConfigurationForm.style';
import { ArrowBackIcon } from '@/assets/icons';
import { ConfigurationFormDataArray } from './ConfigurationForm.data';
import { FormProvider } from '@/components/ReactHookForm';
import useConfigurationForm from './useConfigurationForm';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';

const ConfigurationForm = ({}: any) => {
  const {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    addTwilioConfigurationLoading,
  } = useConfigurationForm();

  return (
    <Box sx={styles?.configurationBox(theme)}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Link href={AIR_MARKETER?.SMS_MARKETING}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>

        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Add Configuration
        </Typography>
      </Box>
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {ConfigurationFormDataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          gap: '15px',
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={addTwilioConfigurationLoading}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Add
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ConfigurationForm;
