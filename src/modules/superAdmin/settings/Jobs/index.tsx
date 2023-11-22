import React from 'react';
import { Button, Typography, Box, Tabs, Tab, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import JobPosting from './JobPosting';
import JobApplication from './JobApplication';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { jobPostingDataArray } from './Jobs.data';
import useJobs from './useJobs';

const Jobs = () => {
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };
  const {
    openAddJobPost,
    handleOpenAddJobPost,
    handleCloseAddJobPost,
    loadingPostAddJob,
    handleSubmitAddJobPost,
    methodsAddJobPost,
  } = useJobs();

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '19px',
          padding: '20px 20px 0px 20px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: '600' }}>
          Jobs
        </Typography>
        {tabsValue === 0 && (
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={handleOpenAddJobPost}
          >
            <PlusShared /> &nbsp; Post a Job
          </Button>
        )}
      </Box>

      <Box sx={{ padding: '0px 24px' }}>
        <Tabs value={tabsValue} onChange={handleTabsChange}>
          <Tab label="Job Posting" />
          <Tab label="Job Application" />
        </Tabs>
      </Box>
      {tabsValue === 0 && <JobPosting />}
      {tabsValue === 1 && <JobApplication />}

      <CommonDrawer
        isDrawerOpen={openAddJobPost}
        onClose={handleCloseAddJobPost}
        title="Post a Job"
        okText="Post"
        isOk={true}
        footer={true}
        isLoading={loadingPostAddJob}
        submitHandler={handleSubmitAddJobPost}
      >
        <>
          <FormProvider methods={methodsAddJobPost}>
            <Grid container spacing={4}>
              {jobPostingDataArray?.map((item: any) => (
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
          </FormProvider>
        </>
      </CommonDrawer>
    </Box>
  );
};
export default Jobs;
