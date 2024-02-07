import { AddAlertPopupIcon, BackArrIcon } from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { businessEmail, personalEmail } from './CompareEmails.data';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { AlertModals } from '@/components/AlertModals';

const CompareEmails = () => {
  const router = useRouter();
  const [searchByCompareEmails, setSearchByCompareEmails] = useState();
  const [datePickerVal, setDatePickerVal] = useState(new Date());
  const [IsAddEmail, setIsAddEmail] = useState(false);

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
                <RHFSelect name="businessEmail1" label="Email" size="small">
                  {personalEmail?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <RHFSelect name="businessEmail2" label="Email" size="small">
                  {businessEmail?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
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
export default CompareEmails;
