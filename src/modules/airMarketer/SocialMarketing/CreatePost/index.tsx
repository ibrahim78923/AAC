import React from 'react';
import {
  ArrowBackIcon,
  CreatePostCalendaIcon,
  ProfilePlusIcon,
} from '@/assets/icons';
import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { airMarketingCalendar } from '@/routesConstants/paths';
import { createPostDataArray } from './CreatePost.data';
import useCreatePost from './useCreatePost';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
      <Grid item xs={12} lg={6}>
        <Box
          sx={{
            backgroundColor: '#FDFDFD',
            border: '1px solid #F2F2F2',
            borderRadius: '10px',
            padding: '15px',
          }}
        >
          <Typography variant="h4">Preview</Typography>
          <Typography variant="body2">Your Preview will appear here</Typography>

          <Box
            sx={{
              boxShadow: '0px 4px 10px 2px rgba(149, 149, 149, 0.10)',
              borderRadius: '10px',
              backgroundColor: 'white',
              padding: '20px',
              marginTop: '20px',
            }}
          >
            <Box sx={{ display: 'Flex', alignItems: 'center' }}>
              <Box>
                <Skeleton
                  variant="circular"
                  width={60}
                  height={60}
                  sx={{ bgcolor: '#EBECF1' }}
                />
              </Box>
              <Box sx={{ marginLeft: '10px' }}>
                <Skeleton
                  variant="rounded"
                  sx={{
                    marginTop: '10px',
                    bgcolor: '#EBECF1',
                    width: '200px',
                    '@media (max-width: 500px)': {
                      width: '90px',
                    },
                  }}
                  height={10}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                    marginTop: '10px',
                    bgcolor: '#EBECF1',
                    width: '94px',
                    '@media (max-width: 500px)': {
                      width: '60px',
                    },
                  }}
                  height={10}
                />
              </Box>
            </Box>

            <Skeleton
              variant="rounded"
              sx={{
                marginTop: '20px',
                bgcolor: '#EBECF1',
                width: '443px',
                '@media (max-width: 500px)': {
                  width: '140px',
                },
              }}
              height={10}
            />
            <Skeleton
              variant="rounded"
              sx={{
                marginTop: '10px',
                bgcolor: '#EBECF1',
                width: '348px',
                '@media (max-width: 500px)': {
                  width: '100px',
                },
              }}
              height={10}
            />
            <Skeleton
              variant="rounded"
              sx={{
                marginTop: '10px',
                bgcolor: '#EBECF1',
                width: '280px',
                '@media (max-width: 500px)': {
                  width: '70px',
                },
              }}
              height={10}
            />

            <Skeleton
              variant="rounded"
              height={313}
              sx={{ marginTop: '25px', bgcolor: '#EBECF1' }}
            />
          </Box>

          <Divider sx={{ marginTop: '80px' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginY: '20px',
              '@media (max-width:550px)': {
                display: 'grid',
                gap: '15px',
              },
            }}
          >
            <Button
              variant="outlined"
              sx={{ backgroundColor: '#D7F4F0' }}
              startIcon={<ProfilePlusIcon />}
            >
              Send for Approval
            </Button>
            <Button
              variant="outlined"
              sx={{
                marginLeft: { sm: '10px', xs: '0px' },
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
                color: '#6B7280',
              }}
              startIcon={<CreatePostCalendaIcon />}
            >
              Schedule
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: { sm: '10px', xs: '0px' } }}
              endIcon={<ArrowDropDownIcon />}
              onClick={() => router.push(`${airMarketingCalendar?.calendar}`)}
            >
              Post Now
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default CreatePost;
