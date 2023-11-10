import React from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const router = useRouter();
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router.push(`${airMarketingCalendar?.calendar}`)}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h4">Create Post</Typography>
      </Box>
    </>
  );
};
export default CreatePost;
