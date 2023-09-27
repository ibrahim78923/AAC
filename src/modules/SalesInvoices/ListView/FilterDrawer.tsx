import React, { useState } from 'react';
import { FilterAlt } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import CommonDrawer from '@/components/Drawer';
import { useForm } from 'react-hook-form';

const FilterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <Box>
      <Button
        sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
        startIcon={<FilterAlt />}
        onClick={() => setIsDrawerOpen(true)}
      >
        {' '}
        Filter{' '}
      </Button>

      <CommonDrawer
        okText="Apply"
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title="Filters"
        isOk={true}
        submitHandler={() => {}}
      >
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <Stack gap="20px">
            <input {...register('firstName')} placeholder="First name" />
            <select {...register('category', { required: true })}>
              <option value="">Select...</option>
              <option value="A">Option A</option>
              <option value="B">Option B</option>
            </select>
            <textarea {...register('aboutYou')} placeholder="About you" />
            <p>{data}</p>
            <input type="submit" />
          </Stack>
        </form>
      </CommonDrawer>
    </Box>
  );
};

export default FilterDrawer;
