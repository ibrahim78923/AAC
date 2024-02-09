import { Box } from '@mui/material';

const PostOverview = (postData: any) => {
  return <Box>{postData?.description}</Box>;
};

export default PostOverview;
