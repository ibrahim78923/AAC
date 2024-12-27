import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { styles } from './ConfigurationForm.style';
import { ArrowBackIcon } from '@/assets/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ConfigurationFormDataArray,
  configurationFormDefaultValues,
  configurationFormValidationSchema,
} from './ConfigurationForm.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useRouter } from 'next/router';

const ConfigurationForm = ({ setIsAddConfiguration }: any) => {
  const router = useRouter();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(configurationFormValidationSchema),
    defaultValues: configurationFormDefaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async () => {
    router.push('/air-marketer/sms-marketing/integration-configuration');
  };

  return (
    <Box sx={styles?.configurationBox(theme)}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={() => setIsAddConfiguration(false)}>
          <ArrowBackIcon />
        </IconButton>
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
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurationForm;
