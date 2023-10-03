import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import CommonDrawer from '@/components/Drawer';
import { FilterAlt } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  status: string;
  createdDate: string;
  createdBy: number;
}

const FilterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = () => {
    // console.log(data);
  };

  return (
    <Box>
      <Button
        sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
        startIcon={<FilterAlt />}
        onClick={() => setIsDrawerOpen(true)}
      >
        Filter
      </Button>

      <CommonDrawer
        okText="Apply"
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title="Filters"
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <FormControl fullWidth>
              <label>Status</label>
              <Select
                {...register('status', { required: true, maxLength: 20 })}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <label>Created By</label>
              <Select
                {...register('createdBy', { required: true, maxLength: 20 })}
                placeholder="Select User"
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </form>
      </CommonDrawer>
    </Box>
  );
};

export default FilterDrawer;
