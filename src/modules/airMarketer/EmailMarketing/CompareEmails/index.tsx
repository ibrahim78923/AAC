import { BackArrIcon, PlusIcon } from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import { Button, Grid, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { businessEmail, personalEmail } from './CompareEmails.data';

const CompareEmails = () => {
  const router = useRouter();
  const [searchByCompareEmails, setSearchByCompareEmails] = useState();
  const CampaignTask: any = useForm({});

  return (
    <Grid container>
      <Grid item md={12} lg={3}>
        <Typography variant="h4">
          {' '}
          <span onClick={() => router.back()}>
            {' '}
            <BackArrIcon />
          </span>{' '}
          &nbsp; Compare Emails
        </Typography>
      </Grid>
      <Grid item md={12} lg={9} sx={{ textAlign: 'end' }}>
        <Search
          searchBy={searchByCompareEmails}
          setSearchBy={setSearchByCompareEmails}
          label="Search Here"
          width={260}
          size="small"
        />

        <Button
          onClick={() => router.push(`${AIR_MARKETER?.CREATE_NEW_EMAIL}`)}
          variant="contained"
          className="small"
          style={{ margin: '0px 18px' }}
          startIcon={<PlusIcon />}
        >
          Add Email
        </Button>
      </Grid>
      <Grid item md={12}>
        <FormProvider methods={CampaignTask}>
          <Grid container>
            <Grid item xs={6}>
              <RHFSelect name="businessEmail" label="Email" size="small">
                {personalEmail?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="businessEmail" label="Email" size="small">
                {businessEmail?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
};
export default CompareEmails;
