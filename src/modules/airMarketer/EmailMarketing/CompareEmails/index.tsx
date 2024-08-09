import { AddAlertPopupIcon, BackArrIcon } from '@/assets/icons';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFSelect,
} from '@/components/ReactHookForm';
import Search from '@/components/Search';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { useLazyGetDashboardUserAccessListDropdownListForDashboardQuery } from '@/services/airServices/dashboard';
import { EmailViewPropsI } from './compareEmail.interface';
import { AlertModals } from '@/components/AlertModals';
import { personalEmail } from './CompareEmails.data';
import { v4 as uuidv4 } from 'uuid';

const CompareEmails = () => {
  const router = useRouter();
  const [searchByCompareEmails, setSearchByCompareEmails] = useState();
  const [datePickerVal, setDatePickerVal] = useState(new Date());
  const [IsAddEmail, setIsAddEmail] = useState(false);

  const apiQueryUsers =
    useLazyGetDashboardUserAccessListDropdownListForDashboardQuery?.();

  const CampaignTask: any = useForm({});

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
          <FormProvider methods={CampaignTask}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <RHFAutocompleteAsync
                  label="Email"
                  name="emailCompare_one"
                  fullWidth
                  apiQuery={apiQueryUsers}
                  multiple
                  size="small"
                  placeholder="Select email"
                  getOptionLabel={(option: any) =>
                    `${option?.firstName} ${option?.lastName}`
                  }
                />
                <Box>
                  <EmailView
                    fromName={''}
                    subject={''}
                    sendDate={''}
                    openRate={60}
                    clickThroughRate={70}
                    clickRate={30}
                    blocked={40}
                    numberOfLinksClicked={30}
                    read={55}
                    skimmed={46}
                    glanced={88}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <RHFAutocompleteAsync
                  label="Email"
                  name="emailCompare_one"
                  fullWidth
                  apiQuery={apiQueryUsers}
                  multiple
                  size="small"
                  placeholder="Select email"
                  getOptionLabel={(option: any) =>
                    `${option?.firstName} ${option?.lastName}`
                  }
                />
                <Box>
                  <EmailView
                    fromName="berlin.fur@gmail.com "
                    subject="Testing Mail Users"
                    sendDate="May 30. 2023"
                    openRate={20}
                    clickThroughRate={10}
                    clickRate={10}
                    blocked={10}
                    numberOfLinksClicked={30}
                    read={55}
                    skimmed={46}
                    glanced={88}
                  />
                </Box>
              </Grid>
            </Grid>

            {IsAddEmail && (
              <AlertModals
                message={
                  <>
                    <RHFSelect name="addEmail" label="Email" size="small">
                      {personalEmail?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </RHFSelect>
                  </>
                }
                type="Add Email"
                typeImage={<AddAlertPopupIcon />}
                open={IsAddEmail}
                handleClose={() => setIsAddEmail(false)}
                handleSubmit={() => setIsAddEmail(false)}
                submitBtnText="Add"
                cancelBtnText="Cancel"
              />
            )}
          </FormProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

const EmailView = ({
  fromName,
  subject,
  sendDate,
  openRate,
  clickThroughRate,
  clickRate,
  blocked,
  numberOfLinksClicked,
  read,
  skimmed,
  glanced,
}: EmailViewPropsI) => {
  const theme = useTheme();
  return (
    <Box>
      <Card sx={{ mt: 2 }}>
        <Box
          sx={{
            width: '100%',
            height: '250px',
            backgroundColor: theme?.palette?.grey[400],
          }}
        ></Box>
        <Box
          sx={{
            padding: '20px 20px 10px 20px',
          }}
        >
          <EmailCardTitles title={'From name'} value={fromName} />
          <EmailCardTitles title={'Subject'} value={subject} />
          <EmailCardTitles title={'Send Date'} value={sendDate} />
          <Box
            sx={{
              borderTop: `1px solid ${theme?.palette?.grey[400]}`,
              mt: 2,
              pt: 2,
            }}
          >
            <EmailCardProgress title={'Open Rate'} value={openRate} />
            <EmailCardProgress
              title={'Click -Through Rate'}
              value={clickThroughRate}
            />
            <EmailCardProgress title={'Click Rate'} value={clickRate} />
            <EmailCardProgress title={'Blocked'} value={blocked} />
            <EmailCardProgress
              title={'Number of links clicked'}
              value={numberOfLinksClicked}
            />
          </Box>
        </Box>
      </Card>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <ReadabilityCards title={'Read'} value={read} />
          </Grid>
          <Grid item md={6}>
            <ReadabilityCards title={'Skimmed'} value={skimmed} />
          </Grid>
          <Grid item md={6}>
            <ReadabilityCards title={'Glanced'} value={glanced} />
          </Grid>
        </Grid>
      </Box>
    </Box>
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
