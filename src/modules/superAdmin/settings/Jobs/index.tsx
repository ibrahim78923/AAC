import React from 'react';

import { Button, Typography, Box, Tabs, Tab } from '@mui/material';

import JobPosting from './JobPosting';
import JobApplication from './JobApplication';

import PlusShared from '@/assets/icons/shared/plus-shared';
import useJobs from './useJobs';

const Jobs = () => {
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };
  const { openAddJobPost, handleOpenAddJobPost, handleCloseAddJobPost } =
    useJobs();

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
      {tabsValue === 0 && (
        <JobPosting
          isOpenAddJobPost={openAddJobPost}
          closeAddJobPost={handleCloseAddJobPost}
          openAddJobPost={handleOpenAddJobPost}
        />
      )}
      {tabsValue === 1 && <JobApplication />}
    </Box>
  );
};
export default Jobs;
