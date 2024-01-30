import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { EmojiOutlinedIcon, PostIcon, ThreeDotsIcon } from '@/assets/icons';
import { UserProfileAvatarImage } from '@/assets/images';

import { styles } from '../PostComments.style';

const DiscussInternallyDrawer = ({
  isDiscussInternally,
  setIsDiscussInternally,
}: any) => {
  const theme = useTheme();

  const [discussionType, setIsDcussionType] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CommonDrawer
      title="Add a note"
      isDrawerOpen={isDiscussInternally}
      onClose={() => setIsDiscussInternally(false)}
      okText={''}
      isOk={false}
      footer={false}
      submitHandler={() => setIsDiscussInternally(false)}
    >
      <Box>
        <Box
          sx={{
            background: theme?.palette?.primary?.lighter,
            p: 1.5,
            borderRadius: '19.8px',
            mb: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Image
              src={UserProfileAvatarImage}
              width={30}
              height={30}
              alt="profile"
            />
            <Typography variant="body3" fontWeight={500}>
              Paula Griffin
            </Typography>
            <Box
              sx={{ position: 'absolute', right: '0px', top: '0px' }}
              onClick={() => setIsDcussionType('add-note')}
            >
              <Button
                sx={styles?.unStyledButton}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <ThreeDotsIcon color={'#000'} />
              </Button>
            </Box>
          </Box>
          <TextField
            sx={{
              mt: 1,
              background: theme?.palette?.common?.white,
              borderRadius: '20px',
              '& .css-1y9xby2-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '9px 15px',
                fontSize: '12px',
              },
              '& .css-4sveug-MuiInputBase-root-MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            background: theme.palette.grey[100],
            p: 1.5,
            borderRadius: '19.8px',
            mb: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Image
              src={UserProfileAvatarImage}
              width={30}
              height={30}
              alt="profile"
            />
            <Typography variant="body3" fontWeight={500}>
              Paula Griffin
            </Typography>
            <Box
              sx={{ position: 'absolute', right: '0px', top: '0px' }}
              onClick={() => setIsDcussionType('note-reply')}
            >
              <Button
                sx={styles?.unStyledButton}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <ThreeDotsIcon color={'#000'} />
              </Button>
            </Box>
          </Box>
          <TextField
            sx={{
              mt: 1,
              background: theme?.palette?.common?.white,
              borderRadius: '20px',
              '& .css-1y9xby2-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '4px 15px',
                fontSize: '12px',
              },
              '& .css-4sveug-MuiInputBase-root-MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TextField
          sx={{
            mt: 1,
            '& .css-1y9xby2-MuiInputBase-input-MuiOutlinedInput-input': {
              padding: '11px 15px',
            },
          }}
          fullWidth
          placeholder="Add Your Note Here"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ transform: 'rotate(326deg)' }}>
                  <PostIcon />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {discussionType === 'note-reply' && (
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </CommonDrawer>
  );
};

export default DiscussInternallyDrawer;
