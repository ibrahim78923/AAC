import React, { useState } from 'react';

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Typography,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import { EyeIcon, EyeSlashIcon } from '@/assets/icons';

import useOtherMailDrawer from './useOtherMailDrawer';
import { DRAWER_TYPES } from '@/constants/strings';
import { API_STATUS } from '@/constants';

const OtherMailDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    isOtherEmailDrawerType,
    setIsOtherEmailDrawerType,
  } = props;

  const {
    handleSubmit,
    methodsOtherMail,
    onSubmit,
    loadingPost,
    loadingUpdate,
    isLoadingOtherDetails,
  } = useOtherMailDrawer({ isOtherEmailDrawerType, setOpenDrawer });

  const [showPassword, setShowPassword] = useState<any>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const isCreateDrawer = isOtherEmailDrawerType === DRAWER_TYPES?.ADD;

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setIsOtherEmailDrawerType('');
        }}
        title={isCreateDrawer ? 'Others' : 'Update Others'}
        okText={isCreateDrawer ? 'Save' : 'Update'}
        isOk={true}
        footer={true}
        isLoading={isCreateDrawer ? loadingPost : loadingUpdate}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ pt: 2 }}>
          {isLoadingOtherDetails === API_STATUS?.PENDING ? (
            <>
              <LinearProgress />
            </>
          ) : (
            <FormProvider
              methods={methodsOtherMail}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <RHFTextField
                    name="email"
                    label="Email"
                    size="small"
                    required={true}
                    placeholder="Type Here"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="username"
                    label="Username"
                    size="small"
                    required={true}
                    autoComplete="off"
                    placeholder="Type Here"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="password"
                    label="Password"
                    size="small"
                    placeholder="Password Here"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Incoming Mail Settings</Typography>
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    name="imapServerHost"
                    label="IMAP Server"
                    size="small"
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    type="number"
                    name="imapServerPort"
                    label={<Box color={'transparent'}>.</Box>}
                    size="small"
                  />
                </Grid>

                <Grid item xs={4}>
                  <RHFCheckbox name="useSSL" label="Use SSL" />
                </Grid>

                <Grid item xs={12}>
                  <RHFSelect
                    label="Authentication Type"
                    name="imapAuthenticationType"
                    size="small"
                    select={true}
                    md={12}
                  >
                    <option value={'plain'}>Plain</option>
                    <option value={'login'}>Login</option>
                  </RHFSelect>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5">Outgoing Mail Settings</Typography>
                </Grid>

                <Grid item xs={6}>
                  <RHFTextField
                    name="smtpServerHost"
                    label="SMTP Server"
                    size="small"
                    required={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    name="smtpServerPort"
                    type="number"
                    label={<Box color={'transparent'}>.</Box>}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFSelect
                    label="Security Mode"
                    name="securityMode"
                    size="small"
                    select={true}
                    md={12}
                  >
                    <option value={'noneSSL'}>None SSL</option>
                    <option value={'tls'}>TLS</option>
                  </RHFSelect>
                </Grid>
                <Grid item xs={12}>
                  <RHFSelect
                    label="Authentication Type"
                    name="smtpAuthenticationType"
                    size="small"
                    select={true}
                    md={12}
                  >
                    <option value={'plain'}>Plain</option>
                    <option value={'login'}>Login</option>
                  </RHFSelect>
                </Grid>
              </Grid>
            </FormProvider>
          )}
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default OtherMailDrawer;
