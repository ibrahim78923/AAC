import React, { useState } from 'react';

import { Button, Typography, Box, Tabs, Tab } from '@mui/material';

import JobPosting from './JobPosting';
import JobApplication from './JobApplication';

import PlusShared from '@/assets/icons/shared/plus-shared';

const Jobs = () => {
  const [isJobPostingDrawer, setIsJobPostingDrawer] = useState<boolean>(false);
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
        padding: '16px 24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '19px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: '600' }}>
          Jobs
        </Typography>
        {tabsValue === 0 && (
          <Button
            variant="contained"
            sx={{ height: '36px', fontWeight: '500' }}
            onClick={() => setIsJobPostingDrawer(true)}
          >
            <PlusShared /> &nbsp; Post a Job
          </Button>
        )}
      </Box>

      <Tabs value={tabsValue} onChange={handleTabsChange}>
        <Tab label="Job Posting" />
        <Tab label="Job Application" />
      </Tabs>
      {tabsValue === 0 && (
        <JobPosting
          isJobPostingDrawer={isJobPostingDrawer}
          setIsJobPostingDrawer={setIsJobPostingDrawer}
        />
      )}
      {tabsValue === 1 && <JobApplication />}
    </Box>
  );
};
export default Jobs;
