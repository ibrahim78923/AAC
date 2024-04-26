import { useState } from 'react';
import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { style } from './CompareSocialPost.style';
import { useComparePost } from './useComparePost';
import SelectPostModal from './SelectPostModal';
import FirstPostOverview from './PostOverview/FirstPostOverView';
import SecondPostOverview from './PostOverview/SecondPostOverview';
import { MinimizePrimaryIcon, PlusPrimaryIcon } from '@/assets/icons';
import {
  postPerformanceColumn,
  postPerformanceData,
  videoPerformanceColumn,
  videoPerformanceData,
} from './CompareSocialPost.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SOCIAL_MAKETER_COMPARE_SOCIAL_POST_PERMISSIONS } from '@/constants/permission-keys';

const CompareSocialPost = () => {
  const {
    theme,
    isSelectPostModal,
    setIsSelectPostModal,
    isOverView,
    setIsOverview,
    firstPost,
    secondPost,
    setFirstPost,
    setSecondPost,
    socialCatgory,
  } = useComparePost();
  const [isPost, setisPost] = useState<any>();

  const firstPostLength = Object?.keys(firstPost)?.length;
  const secondPostLength = Object?.keys(secondPost)?.length;

  return (
    <Box>
      <Box width={{ xs: '100%', md: '31%' }}>
        <Typography variant="h3" color={theme?.palette?.grey[800]}>
          Compare posts
        </Typography>
        <Typography
          variant="body2"
          fontWeight={500}
          mt={1}
          color={theme?.palette?.grey[600]}
        >
          Choose the posts you want to compare below. You can add up to 10 posts
          to compare.
        </Typography>
      </Box>
      <Box className="posts" mt={6}>
        <Box display="flex" gap={3}>
          <Box>
            <Box
              display="flex"
              gap={5}
              flexDirection={{ xs: 'column', lg: 'row' }}
            >
              <Box>
                <Typography variant="h5" color={theme?.palette?.grey[600]}>
                  Post
                </Typography>
                <Box
                  sx={style?.postCompareBox(theme?.palette, firstPostLength)}
                  mt={1}
                  onClick={() => {
                    setIsSelectPostModal(true);
                    setIsOverview(false);
                    setisPost(1);
                  }}
                >
                  <Box display="flex" gap={1} alignItems="center">
                    {firstPost.avatar && (
                      <Box
                        sx={style?.avatarStyle(
                          firstPost?.category,
                          theme?.palette,
                        )}
                      >
                        <Avatar src={firstPost?.avatar}></Avatar>
                        <Box className="avatar-category">
                          {socialCatgory[firstPost?.category]}
                        </Box>
                      </Box>
                    )}
                    <Typography
                      className="postContent"
                      color={theme?.palette?.grey[600]}
                    >
                      {firstPost?.description
                        ? firstPost?.description
                        : 'Select post to compare'}
                    </Typography>
                  </Box>
                  {isOverView ? <MinimizePrimaryIcon /> : <PlusPrimaryIcon />}
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" color={theme?.palette?.grey[600]}>
                  Post
                </Typography>
                <Box
                  sx={style?.postCompareBox(theme?.palette, firstPostLength)}
                  mt={1}
                  onClick={() => {
                    setIsSelectPostModal(true);
                    setIsOverview(false);
                    setisPost(2);
                  }}
                >
                  <Box display="flex" gap={1} alignItems="center">
                    {secondPost?.avatar && (
                      <Box
                        sx={style?.avatarStyle(
                          secondPost?.category,
                          theme?.palette,
                        )}
                      >
                        <Avatar src={secondPost?.avatar}></Avatar>
                        <Box className="avatar-category">
                          {socialCatgory[secondPost?.category]}
                        </Box>
                      </Box>
                    )}
                    <Typography
                      className="postContent"
                      color={theme?.palette?.grey[600]}
                    >
                      {secondPost?.description
                        ? secondPost?.description
                        : 'Select post to compare'}
                    </Typography>
                  </Box>
                  {isOverView ? <MinimizePrimaryIcon /> : <PlusPrimaryIcon />}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          AIR_MARKETER_SOCIAL_MAKETER_COMPARE_SOCIAL_POST_PERMISSIONS.ADD_POST,
        ]}
      >
        <SelectPostModal
          isSelectPostModal={isSelectPostModal}
          setIsSelectPostModal={setIsSelectPostModal}
          setIsOverview={setIsOverview}
          setSecondPost={setSecondPost}
          setFirstPost={setFirstPost}
          post={isPost}
        />
      </PermissionsGuard>

      <PermissionsGuard
        permissions={[
          AIR_MARKETER_SOCIAL_MAKETER_COMPARE_SOCIAL_POST_PERMISSIONS.VIEW_COMPARE_POST,
        ]}
      >
        {isOverView && (
          <Box mt={4}>
            <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
              Overview
            </Typography>
            <Grid container>
              <Grid item xs={12} md={3.5}>
                {firstPost?.id && <FirstPostOverview postData={firstPost} />}
              </Grid>
              <Grid item xs={12} md={3.5}>
                {secondPost?.id && <SecondPostOverview postData={secondPost} />}
              </Grid>
            </Grid>
            {firstPostLength > 0 && secondPostLength > 0 && (
              <Grid container>
                <Grid item xs={5}>
                  <Box my={2} sx={style?.comparePosts}>
                    <Typography variant="h4">
                      Social Post Performance
                    </Typography>
                    <Card sx={{ mt: 2 }}>
                      <TanstackTable
                        columns={postPerformanceColumn}
                        data={postPerformanceData}
                      />
                    </Card>
                  </Box>
                  <Box my={2} sx={style?.comparePosts}>
                    <Typography variant="h4">Video Post Performance</Typography>
                    <Card sx={{ mt: 2 }}>
                      <TanstackTable
                        columns={videoPerformanceColumn}
                        data={videoPerformanceData}
                      />
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </PermissionsGuard>
    </Box>
  );
};

export default CompareSocialPost;
