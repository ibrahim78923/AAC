import {
  ArrowDropDown,
  FilterrIcon,
  PlusIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  Box,
  Button,
  Typography,
  Stack,
  useTheme,
  Grid,
  MenuItem,
  Menu,
  CircularProgress,
  Tooltip,
} from '@mui/material';
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
  useDeleteEmailSettingsMutation,
  useEmailSettingsLatestIdentitiesMutation,
  useEmailSettingsVerifyOTPMutation,
  useGetEmailSettingsIdentitiesQuery,
  usePostEmailSettingsMutation,
  useResendEmailOTPMutation,
} from '@/services/airMarketer/email-settings';
import { PAGINATION } from '@/config';
import { API_STATUS, indexNumbers } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import Filters from './Filters';
import { defaultValues, validationSchema } from './Filters/Filters.data';

const EmailSettings = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [emailSettingSearch, setEmailSettingSearch] = useState('');

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filtersData, setFiltersData] = useState<any>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filters methods and operations ++
  const methodsFilters: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit: handelSubmitFilters, reset: resetValues } =
    methodsFilters;
  const onSubmitFilters = async (values: any) => {
    setFiltersData({ ...filtersData, ...values });
    setIsOpenFilter(false);
  };
  // Filters methods and operations --

  const { data, status, refetch } = useGetEmailSettingsIdentitiesQuery({
    params: {
      page: page,
      limit: pageLimit,
      ...(filtersData?.email?.email && { email: filtersData?.email?.email }),
      ...(emailSettingSearch.length > 0 && { search: emailSettingSearch }),
    },
  });

  const [addNewEmailModal, setAddNewEmailModal] = useState(false);
  const [verifyOTPModal, setVerifyOTPModal] = useState(false);
  const [currentEmailAddress, setCurrentEmailAddress] = useState('');

  const [activeEmailState, setActiveEmailState] = useState('');

  const theme = useTheme();

  const [selectedRecords, setSelectedRecords] = useState<any>([]);

  const methods: any = useForm({
    resolver: yupResolver(linkNewEmailValidationSchema?.()),
    defaultValues: linkNewEmailDefaultValues(),
  });

  const [postEmailSettings, { isLoading: loadingPostEmailSettings }] =
    usePostEmailSettingsMutation();
  const [deleteEmailSettings, { isLoading: loadingDeleteEmailSettings }] =
    useDeleteEmailSettingsMutation();
  const [emailSettingsVerifyOTP, { isLoading: loadingEmailSettingsVerifyOTP }] =
    useEmailSettingsVerifyOTPMutation();
  const [resendEmailOTP, { isLoading: loadingResendEmailOTP }] =
    useResendEmailOTPMutation();

  const { handleSubmit, reset } = methods;
  const [otp, setOtp] = useState('');

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Clear the interval when the timer ends
          setIsTimerRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on component unmount
  }, [timeLeft]);

  const handleChange = (value: any) => {
    setOtp(value);
  };

  const resendOTP = async ({ emailState }: any) => {
    try {
      await resendEmailOTP({
        email: emailState ? emailState : activeEmailState,
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: 'success',
      });
      setTimeLeft(30);
      setIsTimerRunning(true);
      if (emailState) {
        setCurrentEmailAddress(emailState);
        handleClose();
        setVerifyOTPModal(true);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const deleteEmail = async () => {
    try {
      await deleteEmailSettings({
        id: selectedRecords?.map((item: any) => item?._id),
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: 'success',
      });
      setIsDeleteModalOpen(false);
      setSelectedRecords([]);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
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
      setOtp('');
      setCurrentEmailAddress('');
      setVerifyOTPModal(false);
      setSelectedRecords([]);
    } catch (error: any) {
      enqueueSnackbar(
        error?.data?.message === 'Invalid code'
          ? 'Invalid OTP entered'
          : 'Something went wrong !',
        { variant: 'error' },
      );
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
      setActiveEmailState(values?.email);
      setCurrentEmailAddress(values?.email);
      resetValues();
      setAddNewEmailModal(false);
      setVerifyOTPModal(true);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong !', {
        variant: 'error',
      });
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelActionResendOTP = () => {
    resendOTP({ emailState: selectedRecords[indexNumbers?.ZERO]?.email });
  };

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
          variant="outlined"
          color="inherit"
          className="small"
          disabled={selectedRecords?.length < 1}
          sx={{
            width: { xs: '100%', sm: 'auto', md: 'auto', lg: '112px' },
          }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Actions
          <ArrowDropDown />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {selectedRecords[indexNumbers?.ZERO]?.status !== 'VERIFIED' && (
            <MenuItem
              onClick={() => {
                if (!isTimerRunning) {
                  handelActionResendOTP();
                }
              }}
              disabled={selectedRecords?.length > 1 || isTimerRunning}
            >
              {isTimerRunning ? (
                <>
                  {' '}
                  Resend Otp in <strong>{timeLeft}s</strong>
                </>
              ) : (
                <>
                  Resend OTP &nbsp;{' '}
                  {loadingResendEmailOTP && <CircularProgress size={15} />}
                </>
              )}
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              setIsDeleteModalOpen(true);
              handleClose;
            }}
          >
            Delete
          </MenuItem>
        </Menu>

        <Tooltip title={'Refresh Filter'}>
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            sx={{
              width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
            }}
            onClick={() => {
              reset(), setFiltersData({});
            }}
          >
            <RefreshTasksIcon />
          </Button>
        </Tooltip>

        <Button
          className="small"
          startIcon={<FilterrIcon />}
          onClick={() => setIsOpenFilter(true)}
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
        // open={true}
        open={verifyOTPModal}
        handleClose={() => {
          setVerifyOTPModal(false);
          setOtp('');
        }}
        handleCancel={() => {
          setVerifyOTPModal(false);
          setOtp('');
        }}
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
                mt: 3,
                justifyContent: 'space-between',
              }}
            >
              <div>
                {isTimerRunning ? (
                  <Box
                    sx={{
                      color: theme?.palette?.grey[500],
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    Resend Otp in <strong>{timeLeft}s</strong>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      color: theme?.palette?.primary?.main,
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: loadingResendEmailOTP ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => {
                      if (!loadingResendEmailOTP) {
                        resendOTP({
                          emailState:
                            selectedRecords[indexNumbers?.ZERO]?.email,
                        });
                      }
                    }}
                  >
                    {loadingResendEmailOTP && <CircularProgress size={12} />}
                    &nbsp; Resend OTP
                  </Box>
                )}
              </div>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
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
          </Box>
        </>
      </CommonModal>

      <AlertModals
        message={`Are you sure you want to delete ${
          selectedRecords.length > 1 ? 'these' : 'this'
        }  ${selectedRecords.length > 1 ? 'records' : 'record'} ?`}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmitBtn={deleteEmail}
        loading={loadingDeleteEmailSettings}
        // disableCancelBtn={deleteAttachmentStatus?.isLoading}
      />

      <Filters
        handleSubmit={handelSubmitFilters}
        onSubmit={onSubmitFilters}
        methods={methodsFilters}
        isOpenDrawer={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
      />
    </Box>
  );
};

export default EmailSettings;
