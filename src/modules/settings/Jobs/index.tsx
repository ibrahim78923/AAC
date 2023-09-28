import React, { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import CommonDrawer from '@/components/Drawer';
import TextEditor from '@/components/TextEditor';
import SearchableSelect from '@/components/SearchableSelect';

import { candidatesArray } from '@/mock/modules/Settings/Jobs';

import { CandidatesArrayI } from './Jobs.interface';
import { Controller, useForm } from 'react-hook-form';

const Jobs = () => {
  const [isJobPostingDrawer, setIsJobPostingDrawer] = useState(false);
  const [editorValue, setEditorValue] = useState<string>('');
  const [searchableSelectValue, setSearchableSelectValue] =
    useState<CandidatesArrayI>();

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
      <Typography variant="h6" sx={{ color: '#4B5563' }}>
        {option.label}
      </Typography>
    );
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
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '600' }}>
          Jobs
        </Typography>
        <Button
          sx={{
            backgroundColor: '#38CAB5',
            color: '#fff',
            width: '127px',
            height: '36px',
            borderRadius: '4px',
            textTransform: 'none',
          }}
          onClick={() => setIsJobPostingDrawer(true)}
        >
          Post a Job
        </Button>
      </Box>
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
                  label="Name"
                  fullWidth
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
              setValue={setSearchableSelectValue}
              selectedValue={searchableSelectValue?.label || ''}
              name="Search candidate"
              label=""
              control={control}
              rules={{ required: 'candidate is required' }}
              error={!!errors.message}
            />
          </form>
        </>
      </CommonDrawer>
    </Box>
  );
};
export default Jobs;
