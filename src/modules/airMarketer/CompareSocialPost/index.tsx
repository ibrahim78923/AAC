import { Box, Typography } from '@mui/material';
import { style } from './CompareSocialPost.style';
import { comparePosts } from './CompareSocialPost.data';
import { useComparePost } from './useComparePost';
import SelectPostModal from './SelectPostModal';
import { v4 as uuidv4 } from 'uuid';

const CompareSocialPost = () => {
  const {
    theme,
    isSelectPostModal,
    setIsSelectPostModal,
    isOverView,
    setIsOverview,
  } = useComparePost();

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
          {comparePosts?.map((item: any) => (
            <Box key={uuidv4()}>
              <Typography variant="h5">Post</Typography>
              <Box
                sx={style?.postCompareBox(theme?.palette)}
                mt={1}
                onClick={() => {
                  setIsSelectPostModal(true);
                  setIsOverview(false);
                }}
              >
                <Typography>{item?.description}</Typography>
                {item?.icon}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <SelectPostModal
        isSelectPostModal={isSelectPostModal}
        setIsSelectPostModal={setIsSelectPostModal}
        setIsOverview={setIsOverview}
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
