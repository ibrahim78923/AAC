import { useState } from 'react';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import { useComparePost } from '../useComparePost';
import PostCards from './PostCards';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import ContactsActions from '../../PostBox/PostBoxActions';

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
  const [datePickerVal, setDatePickerVal] = useState();

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
                size="small"
              />
              <Box display="flex" alignItems="center" gap={1}>
                <SwitchableDatepicker
                  renderInput="button"
                  placement="right"
                  dateValue={datePickerVal}
                  setDateValue={setDatePickerVal}
                />
                <ContactsActions />
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
