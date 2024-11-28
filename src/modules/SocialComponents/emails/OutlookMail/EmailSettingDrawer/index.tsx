'use client';
import React, { useEffect, useState } from 'react';
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
import { validationSchema } from './EmailSetting.data';
import { PlusIcon } from '@/assets/icons';
import {
  useGetEmailSettingsQuery,
  usePatchEmailSettingsMutation,
} from '@/services/commonFeatures/email/others';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const SettingsTabs = ['Email Settings', 'Calendar'];

const EmailSettingDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
}: EmailSettingDrawerI) => {
  const theme = useTheme();

  const [isAddTeamSignature, setIsAddTeamSignature] = useState(false);

  const { data: data } = useGetEmailSettingsQuery({});

  const methodsMailSettings: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fromName: data?.data?.emailSettings?.name,
      fontName: data?.data?.emailSettings?.fontName,
      fontSize: data?.data?.emailSettings?.fontSize,
      fontColor: data?.data?.emailSettings?.fromName,
      teamSignature: data?.data?.emailSettings?.signature,
      fromAddress: data?.data?.emailSettings?.address,
      defaultAddress: data?.data?.emailSettings?.customAddress,
    },
  });
  const { handleSubmit, watch, reset } = methodsMailSettings;

  const [patchEmailSettings, { isLoading }] = usePatchEmailSettingsMutation();

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
      successSnackbar('Settings updated successfully');
      setIsOpenDrawer(false);
    } catch (error: any) {
      errorSnackbar('Something went wrong !');
    }
  };

  const formAddress = watch('fromAddress');
  const isCustomizedAddress = formAddress === 'Customize from address';

  useEffect(() => {
    if (data?.data) {
      reset({
        fromName: data?.data?.emailSettings?.name,
        fontName: data?.data?.emailSettings?.fontName,
        fontSize: data?.data?.emailSettings?.fontSize,
        fontColor: data?.data?.emailSettings?.fromName,
        teamSignature: data?.data?.emailSettings?.signature,
        fromAddress: data?.data?.emailSettings?.address,
        defaultAddress: data?.data?.emailSettings?.customAddress,
      });
    }
  }, [data?.data]);

  useEffect(() => {
    if (data?.data?.emailSettings?.signature) {
      setIsAddTeamSignature(true);
    }
  }, [data?.data?.emailSettings?.signature]);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Email Settings'}
      okText={
        data?.data?.emailSettings &&
        Object.keys(data?.data?.emailSettings?.customAddress)?.length
          ? 'Update'
          : 'Send'
      }
      isOk
      cancelText={'Cancel'}
      submitHandler={handleSubmit(onSubmit)}
      footer
      isLoading={isLoading}
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
                      value: 'DEFAULT',
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
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="h5">Team Signature</Typography>
                  {isAddTeamSignature && (
                    <Grid container>
                      <Grid item xs={12} mt={2}>
                        <RHFEditor name="teamSignature" />
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
                  <option value="arial">Arial</option>
                  <option value="verdana">Verdana</option>
                  <option value="times New Roman">Times New Roman</option>
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
                  <option value={'11'}>11</option>
                  <option value={'12'}>12</option>
                  <option value={'15'}>15</option>
                  <option value={'20'}>20</option>
                  <option value={'25'}>25</option>
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
