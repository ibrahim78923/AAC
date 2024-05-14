'use client';
import React, { useState } from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { EmailSettingDrawerI } from './EmailSettingDrawer.interface';
import CommonTabs from '@/components/Tabs';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { EmailArray } from '@/mock/modules/superAdmin/Email';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './EmailSettingDrawer.styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { defaultValues, validationSchema } from './EmailSetting.data';
import { PlusIcon } from '@/assets/icons';
import { usePatchEmailSettingsMutation } from '@/services/commonFeatures/email';
import { enqueueSnackbar } from 'notistack';

export const SettingsTabs = ['Email Settings', 'Calendar'];

const EmailSettingDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
}: EmailSettingDrawerI) => {
  const theme = useTheme();

  const [isAddTeamSignature, setIsAddTeamSignature] = useState(false);

  const methodsMailSettings: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, watch } = methodsMailSettings;

  const [patchEmailSettings] = usePatchEmailSettingsMutation();

  const onSubmit = async (values: any) => {
    const payload = {
      emailSettings: {
        ...(values?.fromName && { name: values?.fromName }),
        ...(values?.fontName && { fontName: values?.fontName }),
        ...(values?.fontSize && { fontSize: values?.fontSize }),
        ...(values?.fromName && { fontColor: values?.fromName }),
        ...(values?.teamSignature && { signature: values?.teamSignature }),
        ...(values?.fromAddress && { address: values?.fromAddress }),
        ...(values?.defaultAddress && {
          customAddress: values?.defaultAddress,
        }),
      },
    };

    try {
      await patchEmailSettings({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Settings updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const formAddress = watch('fromAddress');
  const isCustomizedAddress = formAddress === 'Customize from address';

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Email Settings'}
      okText={'Send'}
      isOk
      cancelText={'Cancel'}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <CommonTabs tabsArray={SettingsTabs}>
        <Box>
          <FormProvider
            methods={methodsMailSettings}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFSelect
                  label="From Name"
                  name="fromName"
                  size="small"
                  select={true}
                  md={12}
                >
                  <option value={'Agent and Company Name'}>
                    Agent and Company Name
                  </option>
                  <option value={'Company Name'}>Company Name</option>
                </RHFSelect>
              </Grid>

              <Grid item xs={12}>
                <RHFRadioGroup
                  label={<Typography variant="h5">Form Address</Typography>}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  name="fromAddress"
                  options={[
                    {
                      value: 'Use default',
                      label: 'Use default',
                    },
                    {
                      value: 'Customize from address',
                      label: 'Customize from address',
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <RHFTextField
                  name="defaultAddress"
                  size="small"
                  disabled={!isCustomizedAddress}
                  value="jhon@dummy.com"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="h5">Team Signature</Typography>
                  {isAddTeamSignature && (
                    <Grid container>
                      <Grid item xs={12} mt={2}>
                        <RHFEditor name="teamSignature" required={true} />
                      </Grid>
                    </Grid>
                  )}
                  {isAddTeamSignature ? (
                    <Button
                      variant="text"
                      sx={{ my: 1 }}
                      onClick={() => setIsAddTeamSignature(false)}
                    >
                      <Typography
                        variant="body2"
                        color={theme?.palette?.grey[800]}
                        sx={{ fontWeight: '600' }}
                      >
                        Remove Team Signature
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="text"
                      sx={{ my: 1 }}
                      startIcon={<PlusIcon color={theme?.palette?.grey[800]} />}
                      onClick={() => setIsAddTeamSignature(true)}
                    >
                      <Typography
                        variant="body2"
                        color={theme?.palette?.grey[800]}
                        sx={{ fontWeight: '600' }}
                      >
                        Add Team Signature
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Grid>

              <Grid item xs={6}>
                <RHFSelect
                  label="Font Name"
                  name="fontName"
                  size="small"
                  select={true}
                  md={12}
                >
                  <option value="sans-serif">Sans-serif</option>
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                </RHFSelect>
              </Grid>
              <Grid item xs={6}>
                <RHFSelect
                  label="Font Size"
                  name="fontSize"
                  size="small"
                  select={true}
                  md={12}
                >
                  <option value={'10'}>10</option>
                  <option value={'10'}>12</option>
                  <option value={'10'}>15</option>
                  <option value={'20'}>20</option>
                  <option value={'20'}>25</option>
                  <option value={'30'}>30</option>
                  <option value={'40'}>40</option>
                  <option value={'50'}>50</option>
                </RHFSelect>
              </Grid>

              <Box sx={styles?.emailBoxWrap(theme)}>
                <Typography variant="h2" sx={{ fontSize: '16px !important' }}>
                  Preview
                </Typography>
                <Typography sx={styles?.previewWrap(theme)}>
                  What contacts will see in the ‘from address’ when they receive
                  an email from this shared email address
                </Typography>
                <Box sx={styles?.sendEmail(theme)}>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: '14px !important' }}
                    >
                      standard-sandbox-1.orcalo.co.uk
                    </Typography>
                    <Typography
                      variant="customStyle"
                      sx={{ color: theme?.palette?.custom?.main }}
                    >
                      support@standard-sandbox-1.orcalo.co.uk.eu.eu1.r.hs-inbox.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </FormProvider>
        </Box>
        <Box>
          {EmailArray?.map((item) => (
            <Box key={uuidv4()} sx={styles?.emailArray(theme)}>
              {item?.Icon}
              <Typography variant="h6">{item?.Text}</Typography>
            </Box>
          ))}
        </Box>
      </CommonTabs>
    </CommonDrawer>
  );
};

export default EmailSettingDrawer;
