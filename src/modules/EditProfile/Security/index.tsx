import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  TextField,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import {
  profileSecurityDataArray,
  profileSecurityDefaultValues,
  profileSecurityValidationSchema,
} from './Security.data';
import { v4 as uuidv4 } from 'uuid';
import { RQCodeImage } from '@/assets/images';
import { CopyIcon, DownloadIcon } from '@/assets/icons';

const Security = () => {
  // const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isVerifyCode, setIsVerifyCode] = useState<boolean>(false);

  const theme = useTheme();

  // const isPasswordValid = (password: string) => {
  //   const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  //   return regex.test(password);
  // };

  const SwitchhandleChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const profileSecurityForm = useForm({
    resolver: yupResolver(profileSecurityValidationSchema),
    defaultValues: profileSecurityDefaultValues,
  });

  const onSubmit = () => {
    // if (isPasswordValid(values.newPassword)) {
    //   if (values.newPassword !== values.confirmPassword) {
    //     setIsMatchPassword(true);
    //   } else {
    //     setIsMatchPassword(false);
    //   }
    // }
  };

  const { handleSubmit } = profileSecurityForm;

  return (
    <Box>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon sx={{ fontSize: '40px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            padding: '0px',
            borderBottom: `1px solid  ${theme?.palette?.grey[700]}`,
          }}
        >
          <Typography variant="h5">Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider
            methods={profileSecurityForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {profileSecurityDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ marginTop: '30px' }} />

            <Box
              sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}
            >
              <Button
                sx={{
                  marginRight: '15px',
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                  borderRadius: '4px',
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </FormProvider>
        </AccordionDetails>
      </Accordion>

      <Grid container sx={{ justifyContent: 'space-between', marginY: '20px' }}>
        <Typography variant="h5" sx={{ color: theme?.palette?.grey[800] }}>
          Two-Factor Authentication
        </Typography>

        <FormControlLabel
          control={<Switch onChange={SwitchhandleChange} checked={isChecked} />}
          label={!isChecked ? 'Disabled' : 'Enabled'}
        />
      </Grid>
      {isChecked ? (
        <Box
          sx={{
            backgroundColor: '#F9FAFB',
            padding: '20px',
            width: '50%',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          {isVerifyCode ? (
            <>
              <Typography variant="h5" sx={{ marginBottom: '15px' }}>
                Recovery Codes
              </Typography>
              <Typography sx={{ color: '#79839E' }}>
                Recovery codes are the backup codes to access your account in
                case you cannot receive two-factor authentication codes via the
                authenticator app.Make a copy or download these codes and keep
                them somewhere safe before you continue further.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  BWQAS12QW
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  54673FdfA
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  PO1FDAS243
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  976QWYT3
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  OIZA34WQR
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.primary?.main }}
                >
                  OIZA34WQR
                </Typography>
              </Box>

              <Divider sx={{ marginTop: '25px' }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '25px',
                }}
              >
                <Button sx={{ display: 'flex', alignItems: 'center' }}>
                  <DownloadIcon />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme?.palette?.slateBlue?.main,
                      marginLeft: '5px',
                    }}
                  >
                    Download
                  </Typography>
                </Button>

                <Button sx={{ display: 'flex', alignItems: 'center' }}>
                  <CopyIcon />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme?.palette?.slateBlue?.main,
                      marginLeft: '5px',
                    }}
                  >
                    Copy
                  </Typography>
                </Button>

                <Button variant="contained" sx={{ marginTop: '15px' }}>
                  Finish
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography>
                Scan the QR code below using any authenticator app of your
                choice such as
                <Link
                  href="/"
                  style={{
                    color: theme?.palette?.primary?.main,
                    textDecoration: 'underline',
                  }}
                >
                  {' '}
                  Authy, Google Authenticator, LastPass Authenticator{' '}
                </Link>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={RQCodeImage} alt="dropdown" />
              </Box>
              <Typography sx={{ marginBottom: '15px' }}>
                Can’t Scan the QR Code?
              </Typography>
              <Typography sx={{ marginBottom: '20px' }}>
                After scanning the QR code, you will be given a 6-digit
                verification code. Please enter it below.
              </Typography>
              <TextField
                type="number"
                sx={{ backgroundColor: 'white', borderRadius: '4px' }}
              />
              <br />
              <Button
                variant="contained"
                sx={{ marginTop: '15px' }}
                onClick={() => {
                  setIsVerifyCode(true);
                }}
              >
                Verify code and continue
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{ color: theme?.palette?.custom?.bluish_gray }}
        >
          By enabling two-factor authentication, you add an extra layer of
          security that prevents unauthorizd access to your accounts. Once
          enabled, you’ll be required to enter both your password and an
          authentication code from your mobile phone in order to sign into your
          fFreshworks accounts. After you successfully enable two-factor
          authetication, you will not be able to login unless you enter the
          correct authentication code
        </Typography>
      )}
    </Box>
  );
};

export default Security;
