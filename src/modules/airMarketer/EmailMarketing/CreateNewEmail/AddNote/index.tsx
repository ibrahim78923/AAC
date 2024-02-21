import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './styles';
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SendPrimaryIcon, SmileIcon } from '@/assets/icons';
import { AvatarImage, EmailMockupImage } from '@/assets/images';

interface noteProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  isMenuOpen: boolean;
  handlePopverClick: any;
  handlePopverClose: () => void;
  anchorEl: any;
}

const AddANote = ({
  isDrawerOpen,
  onClose,
  handlePopverClick,
  handlePopverClose,
  anchorEl,
  isMenuOpen,
}: noteProps) => {
  return (
    <CommonDrawer
      title="Add a Note"
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      isOk
      okText={'Add'}
      footer
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
            <Box>
              <Box onClick={handlePopverClick} sx={{ cursor: 'pointer' }}>
                <MoreVertIcon />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handlePopverClose}
                PaperProps={{
                  style: {
                    width: '112px',
                  },
                }}
              >
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box sx={styles?.chatContent}>
            <Typography variant="body3" sx={{ color: '#14142B' }}>
              This is an employee email
            </Typography>
            <SmileIcon />
          </Box>
        </Box>
        <Box sx={{ mt: '26px' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Add Your Note Here"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendPrimaryIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
