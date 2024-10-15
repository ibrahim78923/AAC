import { AddAlertPopupIcon, BackArrIcon } from '@/assets/icons';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { EmailViewPropsI } from './compareEmail.interface';
import {
  addEmailDefaultValues,
  addEmailValidationSchema,
  defaultEmailsCompareFields,
} from './CompareEmails.data';
import {
  useGetEmailMarketingByIdQuery,
  useLazyGetAllEmailsAsyncQuery,
} from '@/services/airMarketer/emailMarketing';
import { yupResolver } from '@hookform/resolvers/yup';
import { calculatePercentage } from '@/utils';
import dayjs from 'dayjs';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import CommonModal from '@/components/CommonModal';

const CompareEmails = () => {
  const router = useRouter();

  const { id } = router.query;

  const [searchByCompareEmails, setSearchByCompareEmails] = useState();
  const [datePickerVal, setDatePickerVal] = useState(new Date());
  const [IsAddEmail, setIsAddEmail] = useState(false);
  const theme = useTheme();

  const apiQueryUsers = useLazyGetAllEmailsAsyncQuery?.();
  const methods: any = useForm({});
  const { watch, setValue } = methods;

  const [emailsToCompareSlots, setEmailsToCompareSlots] = useState(
    defaultEmailsCompareFields,
  );

  const emailCompareValues = emailsToCompareSlots?.map((slot) => {
    return {
      value: watch(`emailCompare${slot.uniqueName}`)?._id,
      name: slot?.uniqueName,
    };
  });

  const methodsAddEmail: any = useForm({
    resolver: yupResolver(addEmailValidationSchema),
    defaultValues: addEmailDefaultValues,
  });
  const { handleSubmit: handleSubmitAddEmail, reset: resetAddEmail } =
    methodsAddEmail;
  const onSubmitAddEmail = (values: any) => {
    const newSlot = {
      uniqueName: `slot_${emailsToCompareSlots?.length + 1}`,
    };
    setEmailsToCompareSlots((prevSlots) => [...prevSlots, newSlot]);
    handelSetCurrentFieldValue(newSlot, values?.email);
    setIsAddEmail(false);
    resetAddEmail();
  };

  const handelSetCurrentFieldValue = (newSlot: any, id: any) => {
    if (newSlot) {
      setValue(`emailCompare${newSlot?.uniqueName}`, id);
    }
  };

  const removeEmailSlot = (uniqueName: string) => {
    setEmailsToCompareSlots(
      (prevSlots) =>
        prevSlots?.filter((slot) => slot?.uniqueName !== uniqueName),
    );
  };

  return (
    <Box>
      <Stack direction={{ lg: 'row' }} justifyContent="space-between">
        <Typography variant="h4">
          <span onClick={() => router.back()}>
            <BackArrIcon />
          </span>
          &nbsp; Compare Emails
        </Typography>
        <Stack
          direction={{ md: 'row' }}
          gap={2}
          alignItems={{ md: 'center' }}
          flexWrap="wrap"
        >
          <Search
            searchBy={searchByCompareEmails}
            setSearchBy={setSearchByCompareEmails}
            label="Search Here"
            width={260}
            size="small"
          />
          <SwitchableDatepicker
            renderInput={'date'}
            dateValue={datePickerVal}
            setDateValue={setDatePickerVal}
          />
          <Button
            sx={{ width: { xs: '100%', sm: '100px' } }}
            // onClick={() => router.push(`${AIR_MARKETER?.CREATE_NEW_EMAIL}`)}
            onClick={() => setIsAddEmail(true)}
            variant="contained"
            className="small"
          >
            Add Email
          </Button>
        </Stack>
      </Stack>
      <Grid container>
        <Grid item md={12}>
          <Typography variant="body2" fontWeight={500} sx={{ my: 2 }}>
            Choose the emails you want to compare below. You can add up to 10
            emails to compare
          </Typography>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {/* eslint-disable */}
              {emailsToCompareSlots?.map((slot, index) => {
                const filteredValues: any = emailCompareValues?.filter(
                  (item) => item?.name === slot?.uniqueName,
                );
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <RHFAutocompleteAsync
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          Email
                          {index > 1 && (
                            <Box
                              onClick={() => removeEmailSlot(slot?.uniqueName)}
                            >
                              <Typography
                                sx={{
                                  color: theme?.palette?.error?.main,
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                }}
                              >
                                Remove
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                      name={`emailCompare${slot?.uniqueName}`}
                      fullWidth
                      apiQuery={apiQueryUsers}
                      externalParams={{
                        ...(id && {
                          folderId: id,
                        }),
                      }}
                      size="small"
                      placeholder="Select email"
                      getOptionLabel={(option: any) => option?.subject}
                    />
                    <Box>
                      <EmailView
                        id={filteredValues[indexNumbers?.ZERO]?.value}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </FormProvider>

          <CommonModal
            open={IsAddEmail}
            handleClose={() => setIsAddEmail(false)}
            handleCancel={() => setIsAddEmail(false)}
            handleSubmit={handleSubmitAddEmail(onSubmitAddEmail)}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AddAlertPopupIcon /> Add Email
              </Box>
            }
            okText="Add"
            cancelText="Cancel"
            footer
          >
            <FormProvider methods={methodsAddEmail}>
              <Grid item xs={12}>
                <RHFAutocompleteAsync
                  label="Email"
                  name={'email'}
                  fullWidth
                  apiQuery={apiQueryUsers}
                  externalParams={{
                    ...(id && {
                      folderId: id,
                    }),
                  }}
                  size="small"
                  placeholder="Select email"
                  getOptionLabel={(option: any) => option?.subject}
                />
              </Grid>
            </FormProvider>
          </CommonModal>
        </Grid>
      </Grid>
    </Box>
  );
};

const EmailView = ({ id }: EmailViewPropsI) => {
  const theme = useTheme();

  const { data, status } = useGetEmailMarketingByIdQuery(
    {
      params: {
        id: id,
      },
    },
    { skip: id ? false : true },
  );

  console.log('data', data);
  console.log(calculatePercentage(data?.data?.open, data?.data?.total));

  return (
    <>
      {status === 'pending' ? (
        <>
          <Box sx={{ mt: 2 }}>
            <Skeleton
              variant="rounded"
              sx={{ width: '100%', height: '200px' }}
            />
            <Box
              sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}
            >
              <Skeleton
                variant="rounded"
                sx={{ width: '20%', height: '20px' }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: '20%', height: '20px' }}
              />
            </Box>
            <Box
              sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}
            >
              <Skeleton
                variant="rounded"
                sx={{ width: '30%', height: '20px' }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: '20%', height: '20px' }}
              />
            </Box>
          </Box>
        </>
      ) : (
        <>
          {data && (
            <Box>
              <Card sx={{ mt: 2 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '250px',
                    p: 1,
                    backgroundColor: theme?.palette?.grey[400],
                  }}
                >
                  <Box
                    sx={{
                      width: '80%',
                      height: '100%',
                      background: theme?.palette?.common?.white,
                      margin: '0 auto',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      pointerEvents: 'none',
                      fontSize: '10px',
                      overflow: 'auto',
                      userSelect: 'none',
                    }}
                  >
                    <Box
                      dangerouslySetInnerHTML={{ __html: data?.data?.message }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    padding: '20px 20px 10px 20px',
                  }}
                >
                  <EmailCardTitles
                    title={'From name'}
                    value={data?.data?.from}
                  />
                  <EmailCardTitles
                    title={'Subject'}
                    value={data?.data?.subject}
                  />
                  <EmailCardTitles
                    title={'Send Date'}
                    value={
                      data?.data?.createdAt
                        ? dayjs(data?.data?.createdAt)?.format(DATE_FORMAT?.API)
                        : ''
                    }
                  />
                  <Box
                    sx={{
                      borderTop: `1px solid ${theme?.palette?.grey[400]}`,
                      mt: 2,
                      pt: 2,
                    }}
                  >
                    <EmailCardProgress
                      title={'Open Rate'}
                      value={calculatePercentage(
                        data?.data?.open,
                        data?.data?.total,
                      )}
                    />
                    <EmailCardProgress
                      title={'Click -Through Rate'}
                      value={calculatePercentage(
                        data?.data?.click,
                        data?.data?.total,
                      )}
                    />
                    <EmailCardProgress
                      title={'Click Rate'}
                      value={calculatePercentage(
                        data?.data?.click,
                        data?.data?.total,
                      )}
                    />
                    <EmailCardProgress
                      title={'Blocked'}
                      value={calculatePercentage(
                        data?.data?.complaint,
                        data?.data?.total,
                      )}
                    />
                    <EmailCardProgress
                      title={'Number of links clicked'}
                      value={calculatePercentage(
                        data?.data?.click,
                        data?.data?.total,
                      )}
                    />
                  </Box>
                </Box>
              </Card>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <ReadabilityCards
                      title={'Read'}
                      value={calculatePercentage(
                        data?.data?.open,
                        data?.data?.total,
                      )?.toFixed(0)}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <ReadabilityCards
                      title={'Unread'}
                      value={calculatePercentage(
                        data?.data?.unread,
                        data?.data?.total,
                      )?.toFixed(0)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

const EmailCardTitles = ({ title, value }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ color: theme?.palette?.custom?.cadet_color }}
      >
        {title}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
};
const EmailCardProgress = ({ title, value }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" fontWeight={500}>
        {title}
      </Typography>
      <Box width={'139px'}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: theme?.palette?.grey[400],
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme?.palette?.primary?.main,
            },
          }}
        />
      </Box>
    </Box>
  );
};

const ReadabilityCards = ({ title, value }: any) => {
  const theme = useTheme();
  const bgColorToRender: any = {
    Read: theme?.palette?.primary?.main,
    Skimmed: theme?.palette?.warning?.main,
    Unread: theme?.palette?.warning?.main,
    Glanced: theme?.palette?.secondary?.main,
  };
  return (
    <Card
      sx={{
        borderTop: `5px solid ${bgColorToRender[title]}`,
        borderRadius: '12px',
        height: '100px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              width: '40px !important',
              height: '40px !important',
              position: 'absolute',
              top: '0',
              fontSize: '11px',
              border: `3px solid ${theme?.palette?.grey[400]}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: bgColorToRender[title],
            }}
          >
            {value}%
          </Box>
          <CircularProgress
            variant="determinate"
            value={value}
            sx={{
              width: '40px !important',
              height: '40px !important',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                stroke: bgColorToRender[title],
              },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CompareEmails;
