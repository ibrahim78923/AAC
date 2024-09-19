import { DeleteIcon, FilterrIcon, PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Typography, Stack, useTheme, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  columns,
  linkNewEmailDataArray,
  linkNewEmailDefaultValues,
  linkNewEmailValidationSchema,
} from './EmailSettings.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import CommonModal from '@/components/CommonModal';
import OTPInput from 'react-otp-input';
import {
  useEmailSettingsLatestIdentitiesMutation,
  useEmailSettingsVerifyOTPMutation,
  useGetEmailSettingsIdentitiesQuery,
  usePostEmailSettingsMutation,
} from '@/services/airMarketer/email-settings';
import { PAGINATION } from '@/config';
import { API_STATUS } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const EmailSettings = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [emailSettingSearch, setEmailSettingSearch] = useState('');

  const { data, status, refetch } = useGetEmailSettingsIdentitiesQuery({
    params: {
      page: page,
      limit: pageLimit,
      ...(emailSettingSearch.length > 0 && { search: emailSettingSearch }),
    },
  });

  const [addNewEmailModal, setAddNewEmailModal] = useState(false);
  const [verifyOTPModal, setVerifyOTPModal] = useState(false);
  const [currentEmailAddress, setCurrentEmailAddress] = useState('');

  const theme = useTheme();

  const [selectedRecords, setSelectedRecords] = useState([]);

  const methods: any = useForm({
    resolver: yupResolver(linkNewEmailValidationSchema?.()),
    defaultValues: linkNewEmailDefaultValues(),
  });

  const [postEmailSettings, { isLoading: loadingPostEmailSettings }] =
    usePostEmailSettingsMutation();
  const [emailSettingsVerifyOTP, { isLoading: loadingEmailSettingsVerifyOTP }] =
    useEmailSettingsVerifyOTPMutation();

  const { handleSubmit, reset } = methods;
  const [otp, setOtp] = useState('');

  const handleChange = (value: any) => {
    setOtp(value);
  };

  const handleSubmitOTP = async () => {
    try {
      await emailSettingsVerifyOTP({
        code: otp,
        email: currentEmailAddress,
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: 'success',
      });
      setCurrentEmailAddress('');
      setVerifyOTPModal(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const onSubmit = async (values: any) => {
    try {
      await postEmailSettings({
        body: {
          email: values?.email,
          username: values?.name,
        },
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: 'success',
      });
      setCurrentEmailAddress(values?.email);
      setAddNewEmailModal(false);
      setVerifyOTPModal(true);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const [emailSettingsLatestIdentities] =
    useEmailSettingsLatestIdentitiesMutation();

  const updateIdentities = async () => {
    try {
      await emailSettingsLatestIdentities({})?.unwrap();
      refetch();
    } catch (error: any) {}
  };

  useEffect(() => {
    updateIdentities();
  }, []);

  return (
    <Box>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between" px={1.5}>
        <Typography variant="h4">Email Settings</Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Search
            searchBy={emailSettingSearch}
            setSearchBy={setEmailSettingSearch}
            label="Search Here"
            size="small"
          />
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={() => setAddNewEmailModal(true)}
          >
            Link New Email
          </Button>
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4,
          gap: '10px',
          mb: 2,
        }}
      >
        <Button
          startIcon={
            <DeleteIcon
              color={
                selectedRecords.length < 1
                  ? theme?.palette?.grey[400]
                  : theme?.palette?.grey[500]
              }
            />
          }
          className="small"
          variant="outlined"
          color="inherit"
          sx={{
            width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
          }}
          disabled={selectedRecords.length < 1}
        >
          Delete
        </Button>
        <Button
          className="small"
          startIcon={<FilterrIcon />}
          variant="outlined"
          color="inherit"
          sx={{
            width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
          }}
        >
          Filter
        </Button>
      </Box>

      <TanstackTable
        columns={columns(
          setSelectedRecords,
          selectedRecords,
          data?.data?.emailIdentitiesSES,
        )}
        data={data?.data?.emailIdentitiesSES ?? []}
        isLoading={status === API_STATUS?.PENDING}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isError={status === API_STATUS?.REJECTED}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />

      <CommonModal
        open={addNewEmailModal}
        handleClose={() => setAddNewEmailModal(false)}
        handleCancel={() => setAddNewEmailModal(false)}
        handleSubmit={handleSubmit(onSubmit)}
        title="Link New Email"
        footer={false}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {linkNewEmailDataArray?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={item?.componentProps?.name}
                sx={{
                  paddingTop:
                    index === 0 ? '40px !important' : '17px !important',
                }}
              >
                <item.component {...item.componentProps} size={'small'}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: 2,
            }}
          >
            <Button
              className="small"
              variant="outlined"
              sx={{
                marginLeft: '10px',
                backgroundColor: 'white',
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
              }}
              onClick={() => {
                reset();
                setAddNewEmailModal(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              className="small"
              sx={{ marginLeft: '10px' }}
              type="submit"
              loading={loadingPostEmailSettings}
            >
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </CommonModal>

      <CommonModal
        open={verifyOTPModal}
        handleClose={() => setVerifyOTPModal(false)}
        handleCancel={() => setVerifyOTPModal(false)}
        title="Enter Verification Code"
        titleDescription="Enter Verification code we send to your email address"
        footer={false}
      >
        <>
          <Box>
            <Box sx={{ margin: '0 auto', width: 'fit-content', mt: 1 }}>
              <OTPInput
                value={otp}
                onChange={handleChange}
                numInputs={4}
                inputType="tel"
                renderSeparator={() => <span> &nbsp;-&nbsp; </span>}
                shouldAutoFocus={true}
                renderInput={(inputProps) => (
                  <input
                    {...inputProps}
                    style={{
                      width: '5rem',
                      height: '5rem',
                      margin: '0 0.25rem',
                      fontSize: '2rem',
                      color: `${theme?.palette?.primary?.main}`,
                      borderRadius: '16px',
                      border: `2px solid #ccc`,
                      outline: 'none',
                      textAlign: 'center',
                    }}
                    onFocus={(e) =>
                      (e.target.style.border = `2px solid ${theme?.palette?.primary?.main}`)
                    }
                    onBlur={(e) =>
                      (e.target.style.border = `2px solid ${theme?.palette?.primary?.main}`)
                    }
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                mt: 2,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setVerifyOTPModal(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loadingEmailSettingsVerifyOTP}
                variant="contained"
                onClick={handleSubmitOTP}
                disabled={otp?.length < 4}
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        </>
      </CommonModal>
    </Box>
  );
};

export default EmailSettings;
