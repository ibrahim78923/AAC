import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import { useComparePost } from '../useComparePost';
import PostCards from './PostCards';

const SelectPostModal = (props: any) => {
  const {
    isSelectPostModal,
    setIsSelectPostModal,
    setIsOverview,
    setSecondPost,
    setFirstPost,
    post,
  } = props;
  const { searchBy, setSearchBy } = useComparePost();

  return (
    <Box>
      {isSelectPostModal && (
        <CommonModal
          open={isSelectPostModal}
          handleClose={() => setIsSelectPostModal(false)}
          handleSubmit={() => setIsSelectPostModal(false)}
          title="Select Post"
          footer={false}
          okText="Ok"
          cancelText="ok"
        >
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Search
                label="search"
                width="230px"
                searchBy={searchBy}
                setSearchBy={setSearchBy}
              />
              <Box display="flex" alignItems="center" gap={1}>
                <Button variant="outlined">Date</Button>
                <Button variant="outlined">Filter</Button>
              </Box>
            </Box>
            <Box mt={3}>
              <PostCards
                setIsOverview={setIsOverview}
                setIsSelectPostModal={setIsSelectPostModal}
                setSecondPost={setSecondPost}
                setFirstPost={setFirstPost}
                post={post}
              />
            </Box>
          </Box>
        </CommonModal>
      )}
    </Box>
  );
};

export default SelectPostModal;
