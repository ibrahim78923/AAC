import React, { useState } from 'react';

import { Box, TextField, useTheme, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import SearchableSelect from '@/components/SearchableSelect';
import TextEditor from '@/components/TextEditor';

import { candidatesArray } from '@/mock/modules/Settings/Jobs';

import { JobPostingPropsI } from './JobPostingProps.interface';

import { Controller, useForm } from 'react-hook-form';

const JobPosting = ({
  isJobPostingDrawer,
  setIsJobPostingDrawer,
}: JobPostingPropsI[]) => {
  const theme = useTheme();
  const [editorValue, setEditorValue] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setIsJobPostingDrawer(false);
  };

  const onClose = () => {
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
      <Box>Common table</Box>
      <CommonDrawer
        isDrawerOpen={isJobPostingDrawer}
        onClose={onClose}
        title="Post a Job"
        okText="Post"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <span>dummy text</span>
          <br />
          <TextEditor value={editorValue} onChange={setEditorValue} />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  label=""
                  fullWidth
                  placeholder="Type here"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
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
          </form>
        </>
      </CommonDrawer>
    </Box>
  );
};

export default JobPosting;
