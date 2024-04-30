import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Grid } from '@mui/material';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

const urlRedirectType = [
  { value: 'new', label: 'New' },
  { value: 'air apple cart page', label: 'Air Apple Cart Page' },
  { value: 'air apple blog post', label: 'Air Apple Blog Post' },
  { value: 'meeting link', label: 'Meeting Link' },
  { value: 'file link', label: 'File Link' },
];

const StepButtonInfo = () => {
  return (
    <>
      <Grid item xs={12}>
        <RHFTextField
          name="ctaInternalName"
          label="CTA Internal Name "
          size="small"
          placeholder="Left18px"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <RHFSelect
          name="urlRedirectType"
          label="URL Redirect Type"
          size="small"
        >
          {urlRedirectType?.map((option: any) => (
            <option key={uuidv4()} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </RHFSelect>
      </Grid>

      <Grid item xs={12} md={8}>
        <RHFTextField
          name="url"
          label="Enter Url "
          size="small"
          placeholder="Left"
          required
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={{ paddingTop: { md: '22px' } }}>
          <Button variant="outlined" fullWidth>
            Test URL
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default StepButtonInfo;
