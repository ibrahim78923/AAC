import React from 'react';
import { Box, Button, Popover, TextField } from '@mui/material';
import {
  ATRateIcon,
  CapitalSmallIcon,
  EmojiIcon,
  HashTagIcon,
  LocationIcon,
} from '@/assets/icons';
import EmojiPickerComponent from '@/modules/SocialComponents/Chat/ChatArea/ChatField/ChatFooter/EmojiPicker';
import usePostDetailsField from './usePostDetailsField';

export default function PostDetailsField() {
  const {
    setAnchorEl,
    anchorEl,
    messageText,
    setMessageText,
    handleClick,
    handleEmojiSelect,
    id,
    isOpen,
  } = usePostDetailsField();

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={messageText}
        onChange={(e) => {
          setMessageText(e?.target?.value);
        }}
      />
      <Box
        sx={{
          backgroundColor: 'rgba(231, 245, 244, 0.50)',
          height: '45px',
          position: 'absolute',
          bottom: '0',
          zIndex: '1',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            width: 'fit-content',
            padding: '0px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={handleClick}
        >
          <EmojiIcon />{' '}
        </Button>
        <Button sx={{ cursor: 'pointer', width: 'fit-content' }}>
          <ATRateIcon />{' '}
        </Button>
        <Button sx={{ cursor: 'pointer', width: 'fit-content' }}>
          <HashTagIcon />{' '}
        </Button>
        <Button sx={{ cursor: 'pointer', width: 'fit-content' }}>
          <LocationIcon />{' '}
        </Button>
        <Button sx={{ cursor: 'pointer', width: 'fit-content' }}>
          <CapitalSmallIcon />{' '}
        </Button>
      </Box>

      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
      </Popover>
    </Box>
  );
}
