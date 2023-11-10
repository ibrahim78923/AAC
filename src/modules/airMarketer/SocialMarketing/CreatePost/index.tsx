import React from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import { Box, Grid, Typography } from '@mui/material';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { createPostDataArray } from './CreatePost.data';
import useCreatePost from './useCreatePost';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const CreatePost = () => {
  const { router, methods, handleSubmit, onSubmit } = useCreatePost();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
          <Box
            onClick={() => router.push(`${airMarketingCalendar?.calendar}`)}
            sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
          >
            <ArrowBackIcon />
          </Box>
          <Typography variant="h4">Create Post</Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {createPostDataArray?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{
                  paddingTop:
                    index === 0 ? '40px !important' : '17px !important',
                }}
              >
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Grid>
      <Grid item xs={12} lg={6}></Grid>
    </Grid>
  );
};
export default CreatePost;
