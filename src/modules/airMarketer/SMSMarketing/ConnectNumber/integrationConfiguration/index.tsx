import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  IconAirFP,
  IconArrowRounded,
  IconConnect,
  IconTwilio,
  PlusIcon,
} from '@/assets/icons';
import { styles } from './integrationConfiguration.style';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  columns,
  ConfigurationEditFormDataArray,
  configurationEditFormDefaultValues,
  configurationEditFormValidationSchema,
  integrationConfigurationData,
} from './integrationConfiguration.data';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';
import CommonDrawer from '@/components/CommonDrawer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';

const IntegrationConfiguration = () => {
  const theme = useTheme();

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const getRowValues = columns(theme, setIsEditDrawerOpen);

  const methods = useForm({
    resolver: yupResolver(configurationEditFormValidationSchema),
    defaultValues: configurationEditFormDefaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async () => {};

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Integration Configuration
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <IconTwilio size={48} />
          <Box>
            <Typography variant="h5">Twilio</Typography>
            <Typography variant="body2">Integrations and settings</Typography>
          </Box>
        </Box>
        <Link href={AIR_MARKETER?.SMS_MARKETING_CONNECT_ACCOUNT}>
          <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
            {' '}
            Add New
          </Button>
        </Link>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<IconArrowRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={styles?.accordionSummary(theme)}
          >
            <Box sx={styles?.accordionSummaryInner()}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                  <Box sx={styles?.glowIcons(theme)}>
                    <IconTwilio />
                  </Box>
                  <Typography variant="body2">user@mail.com</Typography>
                </Box>
                <Box sx={{ marginTop: '8px' }}>
                  <IconConnect />
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                  <Box sx={styles?.glowIcons(theme)}>
                    <IconAirFP />
                  </Box>
                  <Typography variant="body2">user@mail.com</Typography>
                </Box>
              </Box>

              <Box>
                <FormControlLabel
                  control={<Switch defaultChecked size="small" />}
                  label="Disconnect"
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TanstackTable
              columns={getRowValues}
              data={integrationConfigurationData}
              isPagination={false}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <CommonDrawer
        footer
        isDrawerOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        title="Edit Configuration"
        okText="Add"
        cancelText="cancel"
        isOk
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => setIsEditDrawerOpen(false)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {ConfigurationEditFormDataArray()?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
      </CommonDrawer>
    </Box>
  );
};

export default IntegrationConfiguration;
