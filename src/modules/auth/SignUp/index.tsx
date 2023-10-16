import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import {
  Grid,
  Button,
  InputAdornment,
  Typography,
  Switch,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputField from '@/components/InputField';
import {
  EyeIcon,
  EyeSlashIcon,
  CompanyLogoIcon,
  VerifiedIcon,
} from '@/assets/icons';
import { LoginDashboardImage } from '@/assets/images';
import { styles } from './SignUp.style';

const SignUp = () => {
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isMatchPassword, setIsMatchPassword] = useState<boolean>(false);
  const [isStepComplete, setIsStepComplete] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [employeesNumber, setEmployeesNumber] = React.useState('');

  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const onSubmit = (data: any) => {
    const { createPassword, confirmPassword } = data;

    if (isPasswordValid(createPassword)) {
      if (createPassword !== confirmPassword) {
        setIsMatchPassword(true);
      } else {
        setIsMatchPassword(false);
        setIsSuccess(true);
      }
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setEmployeesNumber(event.target.value as string);
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={styles.AuthHeader}>
        <Box>
          <CompanyLogoIcon />
        </Box>
        <Box>
          <Link href="/login" variant="contained">
            SigIn
          </Link>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}
      >
        {isSuccess ? (
          <Box sx={{ textAlign: 'center', width: { md: '40%', xs: '85%' } }}>
            <VerifiedIcon />
            <Typography variant="h3" sx={{ marginTop: '10px' }}>
              Let’s get You Verified
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.grey[900], marginBottom: '20px' }}
            >
              A verification Link has been sent to your email account. Please
              click on that link for further verification to proceed.
            </Typography>
            <Typography variant="h6" sx={{ color: theme?.palette?.grey[900] }}>
              If you didn’t get the verification email click on{' '}
              <Link
                href="/sign-up"
                style={{
                  color: theme?.palette?.primary?.main,
                  fontWeight: '600',
                }}
              >
                {' '}
                Resend link{' '}
              </Link>
            </Typography>
          </Box>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                className="form-styled"
                sx={{
                  width: { md: '60%', sm: '70%', xs: '90%' },
                  margin: 'auto',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: theme?.palette?.grey[500_8] }}
                >
                  Welcome to Air Applecart
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.grey[500_12] }}
                >
                  Let’s Get Started!
                </Typography>
                <FormProvider>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={styles.formStyling}
                  >
                    {isStepComplete ? (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: '4px' }}
                        >
                          Select Product(s){' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6} lg={6}>
                            <Controller
                              name="Sales"
                              control={control}
                              rules={{ required: 'required field' }}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      sx={{ color: theme?.palette?.grey[0] }}
                                    />
                                  }
                                  label="Sales"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <Controller
                              name="Operation"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      sx={{ color: theme?.palette?.grey[0] }}
                                    />
                                  }
                                  label="Operation"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6} lg={6}>
                            <Controller
                              name="Marketing"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      sx={{ color: theme?.palette?.grey[0] }}
                                    />
                                  }
                                  label="Marketing"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} lg={6}>
                            <Controller
                              name="Service"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      {...field}
                                      sx={{ color: theme?.palette?.grey[0] }}
                                    />
                                  }
                                  label="Service"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>

                        {errors?.Sales && (
                          <Typography
                            variant="body1"
                            sx={{ color: theme?.palette?.error?.main }}
                          >
                            {' '}
                            {errors?.Sales?.message}
                          </Typography>
                        )}

                        <Typography
                          variant="body2"
                          sx={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          Delegate Reference Number (DRN) if applied
                        </Typography>
                        <Controller
                          name="DRNumber"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="DRNumber"
                              placeholder="Enter DRN"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="number"
                              hasError={!!errors?.DRNumber}
                            />
                          )}
                        />

                        <Typography
                          sx={{ marginBottom: '4px', fontSize: '12px' }}
                        >
                          Enter DRN Number
                        </Typography>

                        <Typography
                          variant="body2"
                          style={{ marginBottom: '4px', marginTop: '10px' }}
                        >
                          Create Password{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="createPassword"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'required field',
                            validate: (value) =>
                              isPasswordValid(value)
                                ? setIsShowError(false)
                                : setIsShowError(true),
                          }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="createPassword"
                              placeholder="Enter password"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              hasError={!!errors?.createPassword}
                              error={errors?.createPassword?.message}
                              type={isShowPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ width: '30px', cursor: 'pointer' }}
                                  >
                                    {isShowPassword ? (
                                      <Box
                                        onClick={() =>
                                          setIsShowPassword(!isShowPassword)
                                        }
                                      >
                                        <EyeIcon />
                                      </Box>
                                    ) : (
                                      <Box
                                        onClick={() =>
                                          setIsShowPassword(!isShowPassword)
                                        }
                                      >
                                        <EyeSlashIcon />
                                      </Box>
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            marginTop: '7px',
                            color: isShowError && theme?.palette?.error?.main,
                          }}
                        >
                          The Password must be at least 8 characters long having
                          1 capital letter,1 small letter and 1 numeric digit
                        </Typography>

                        <Typography
                          variant="body2"
                          style={{ marginBottom: '4px', marginTop: '10px' }}
                        >
                          Confirm Password{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="confirmPassword"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'Required field',
                          }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              hasError={!!errors?.confirmPassword}
                              error={errors?.confirmPassword?.message}
                              type={isShowConfirmPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ width: '30px', cursor: 'pointer' }}
                                  >
                                    {isShowConfirmPassword ? (
                                      <Box
                                        onClick={() =>
                                          setIsShowConfirmPassword(
                                            !isShowConfirmPassword,
                                          )
                                        }
                                      >
                                        <EyeIcon />
                                      </Box>
                                    ) : (
                                      <Box
                                        onClick={() =>
                                          setIsShowConfirmPassword(
                                            !isShowConfirmPassword,
                                          )
                                        }
                                      >
                                        <EyeSlashIcon />
                                      </Box>
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />

                        {isMatchPassword && (
                          <Typography
                            variant="body2"
                            sx={{ color: theme?.palette?.error?.main }}
                          >
                            password not match
                          </Typography>
                        )}

                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ marginTop: '30px' }}
                        >
                          Sign Up
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          style={{ marginBottom: '4px' }}
                        >
                          Full Name <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="fullName"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'required field' }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="fullName"
                              placeholder="Enter fullName"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="text"
                              hasError={!!errors?.fullName}
                              error={errors?.fullName?.message}
                            />
                          )}
                        />

                        <Typography
                          variant="body2"
                          style={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          Email <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'required field',
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Invalid email address',
                            },
                          }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="email"
                              placeholder="Enter email"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="text"
                              hasError={!!errors?.email}
                              error={errors?.email?.message}
                            />
                          )}
                        />

                        {errors?.email && (
                          <Typography
                            variant="body1"
                            sx={{ color: theme?.palette?.error?.main }}
                          >
                            {' '}
                            {errors?.email?.message}
                          </Typography>
                        )}

                        <Typography
                          variant="body2"
                          style={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          Company Registration Number (CRN){' '}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="CRNNumber"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'required field',
                          }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="CRNNumber"
                              placeholder="Enter CRN Number"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="text"
                              hasError={!!errors?.CRNNumber}
                              error={errors?.CRNNumber?.message}
                            />
                          )}
                        />

                        <Typography
                          variant="body2"
                          sx={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          Organization Name
                        </Typography>
                        <Controller
                          name="OrganizationName"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: 'required field',
                          }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="OrganizationName"
                              placeholder="Enter Organization Name"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="text"
                              hasError={!!errors?.OrganizationName}
                              error={errors?.OrganizationName?.message}
                            />
                          )}
                        />

                        <Typography
                          variant="body2"
                          sx={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          No of Employees
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={employeesNumber}
                            label="Age"
                            onChange={handleChange}
                            sx={{ height: '43px' }}
                          >
                            <MenuItem value={50}>10-50</MenuItem>
                            <MenuItem value={100}>50-100</MenuItem>
                            <MenuItem value={150}>100-150</MenuItem>
                            <MenuItem value={200}>150-200</MenuItem>
                            <MenuItem value={250}>200-250</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControlLabel
                          sx={{ marginTop: '20px' }}
                          control={<Switch defaultChecked />}
                          label="Verify your employees through Identity Gram and Get 10% discount"
                        />

                        <Typography
                          variant="body2"
                          sx={{ marginBottom: '4px', marginTop: '20px' }}
                        >
                          Phone Number <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'required field' }}
                          render={({ field }) => (
                            <InputField
                              field={{ ...field }}
                              name="phoneNumber"
                              placeholder="Enter Number"
                              width="100%"
                              height="23px"
                              autoComplete="off"
                              type="number"
                              hasError={!!errors?.phoneNumber}
                              error={errors?.phoneNumber?.message}
                            />
                          )}
                        />

                        <Button
                          variant="contained"
                          sx={{ marginTop: '30px' }}
                          onClick={() => setIsStepComplete(true)}
                        >
                          Next
                        </Button>
                      </>
                    )}
                  </form>
                </FormProvider>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              md={6}
              lg={6}
              style={styles.loginDashboard}
              sx={{
                '@media (max-width: 900px)': {
                  display: 'none !important', // Hide the element when the screen width is less than 900px
                },
              }}
            >
              <Image src={LoginDashboardImage} alt="dashborad" />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SignUp;
