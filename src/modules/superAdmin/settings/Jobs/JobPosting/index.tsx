import React, { useState } from 'react';

import { Box, TextField, useTheme, Typography, Button } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import SearchableSelect from '@/components/SearchableSelect';
import TextEditor from '@/components/TextEditor';
import Search from '@/components/Search';

import { candidatesArray } from '@/mock/modules/Settings/Jobs';

import { JobPostingPropsI } from './JobPostingProps.interface';

import { Controller, useForm } from 'react-hook-form';

import { FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';

import { styles } from './Jobs.styles';

const JobPosting = ({
  isJobPostingDrawer,
  setIsJobPostingDrawer,
}: JobPostingPropsI) => {
  const theme = useTheme();
  const [editorValue, setEditorValue] = useState<string>('');
  const [jobPostingSearch, setJobPostingSearch] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setIsJobPostingDrawer(false);
  };

  const renderCustomOption = (option: any) => {
    return (
      <Typography variant="h6" sx={{ color: theme?.palette.grey[600] }}>
        {option.label} {option.name}
      </Typography>
    );
  };

  return (
    <Box>
      <Box
        mt={2}
        mb={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Search
          label={'Search here'}
          searchBy={jobPostingSearch}
          setSearchBy={setJobPostingSearch}
          width="100%"
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button sx={styles.refreshButton}>
            <RefreshSharedIcon />
          </Button>
          <Button sx={styles.filterButton(theme)}>
            <FilterSharedIcon /> &nbsp; Filter
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: '#ececec73',
          height: '300px',
          borderRadius: '15px',
        }}
      >
        Common table
      </Box>
      <CommonDrawer
        isDrawerOpen={isJobPostingDrawer}
        onClose={() => setIsJobPostingDrawer(false)}
        title="Post a Job"
        okText="Post"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <>
                  <Typography
                    variant="h6"
                    mt={1}
                    style={{ color: theme?.palette.grey[600] }}
                  >
                    Job Post
                  </Typography>
                  <TextField
                    label=""
                    fullWidth
                    placeholder="Type here"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                  />
                </>
              )}
            />

            <SearchableSelect
              dropdownData={candidatesArray}
              renderOption={renderCustomOption}
              name="Search candidate"
              label="Candidate"
              control={control}
              rules={{ required: 'required field' }}
              error={!!errors.message}
            />
            <TextEditor value={editorValue} onChange={setEditorValue} />
          </form>
        </>
      </CommonDrawer>
    </Box>
  );
};

export default JobPosting;
