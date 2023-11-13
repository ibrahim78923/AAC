import { Avatar, Box, Typography } from '@mui/material';
import { style } from './CompareSocialPost.style';
import { useComparePost } from './useComparePost';
import SelectPostModal from './SelectPostModal';
import { useState } from 'react';
import { PlusPrimaryIcon } from '@/assets/icons';

const CompareSocialPost = () => {
  const {
    theme,
    isSelectPostModal,
    setIsSelectPostModal,
    isOverView,
    setIsOverview,
    fisrtPost,
    secondPost,
    setFirstPost,
    setSecondPost,
  } = useComparePost();
  const [isPost, setisPost] = useState<any>();

  return (
    <Box>
      <Box width={{ xs: '100%', md: '31%' }}>
        <Typography variant="h3">Compare posts</Typography>
        <Typography variant="body2" fontWeight={500} mt={1}>
          Choose the posts you want to compare below. You can add up to 10 posts
          to compare.
        </Typography>
      </Box>
      <Box className="posts" mt={6}>
        <Box display="flex" gap={3}>
          <Box>
            <Typography variant="h5">Post</Typography>
            <Box
              display="flex"
              gap={5}
              flexDirection={{ xs: 'column', md: 'row' }}
            >
              <Box
                sx={style?.postCompareBox(theme?.palette)}
                mt={1}
                onClick={() => {
                  setIsSelectPostModal(true);
                  setIsOverview(false);
                  setisPost(1);
                }}
              >
                <Box display="flex" gap={1} alignItems="center">
                  {fisrtPost.avatar && (
                    <Avatar src={fisrtPost?.avatar}></Avatar>
                  )}
                  <Typography>
                    {fisrtPost?.description
                      ? fisrtPost?.description
                      : 'Select post to compare'}
                  </Typography>
                </Box>
                <PlusPrimaryIcon />
              </Box>
              <Box
                sx={style?.postCompareBox(theme?.palette)}
                mt={1}
                onClick={() => {
                  setIsSelectPostModal(true);
                  setIsOverview(false);
                  setisPost(2);
                }}
              >
                <Box display="flex" gap={1} alignItems="center">
                  {secondPost?.avatar && (
                    <Avatar src={secondPost?.avatar}></Avatar>
                  )}
                  <Typography>
                    {secondPost?.description
                      ? secondPost?.description
                      : 'Select post to compare'}
                  </Typography>
                </Box>
                <PlusPrimaryIcon />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <SelectPostModal
        isSelectPostModal={isSelectPostModal}
        setIsSelectPostModal={setIsSelectPostModal}
        setIsOverview={setIsOverview}
        setSecondPost={setSecondPost}
        setFirstPost={setFirstPost}
        post={isPost}
      />

      {isOverView && (
        <Box mt={4}>
          <Typography variant="h4">OverView</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CompareSocialPost;
