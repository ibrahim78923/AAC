import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './styles';
import { Box, Popover, Typography } from '@mui/material';
import { useAddNote } from './useAddNote';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SmileIcon } from '@/assets/icons';
import { AvatarImage, EmailMockupImage } from '@/assets/images';

interface noteProps {
  open: boolean;
  onClose: () => void;
}

const AddANote = ({ open, onClose }: noteProps) => {
  const { handlePopverClick, handlePopverClose, popverId, anchorEl } =
    useAddNote();

  return (
    <CommonDrawer
      title="Add a Note"
      isDrawerOpen={open}
      onClose={onClose}
      isOk
      okText={'Add'}
      footer
      handlerIsFooterFeature={() => {}}
    >
      <Box sx={styles?.subjectWrapper}>
        <SubjectComp title="To" value="CustomerCare@Airapplecart.com" />
        <SubjectComp title="From" value="Mr.RobertFox413@Gmail.com" />
        <SubjectComp title="Subject" value="Business Consultant" />
      </Box>
      <Box>
        <Image src={EmailMockupImage} alt="" style={{ paddingTop: '15px' }} />
        <Box sx={styles?.chatCardContent}>
          <Box sx={styles?.chatWrap}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image src={AvatarImage} alt="" />
              <Typography variant="body4">Paula Griffin</Typography>
            </Box>
            <Box onClick={handlePopverClick}>
              <MoreVertIcon />
            </Box>
            <Popover
              id={popverId}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopverClose}
            ></Popover>
          </Box>
          <Box sx={styles?.chatContent}>
            <Typography variant="body3" sx={{ color: '#14142B' }}>
              This is an employee email
            </Typography>
            <SmileIcon />
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </CommonDrawer>
  );
};

export default AddANote;

const SubjectComp = ({ title, value }: { title: string; value: string }) => {
  return (
    <Box display="flex" alignItems="center" gap="6px" mb="16px">
      <Typography variant="body3" fontWeight={700} color="#000">
        {title}:
      </Typography>
      <Typography variant="body4" fontWeight={400}>
        {value}
      </Typography>
    </Box>
  );
};
