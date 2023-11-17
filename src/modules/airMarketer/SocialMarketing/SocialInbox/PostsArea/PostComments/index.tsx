import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { styles } from './PostComments.style';
import { DysonAvatarImage } from '@/assets/images';
import {
  ArrowDownIcon,
  AttachmentsIcon,
  PostIcon,
  QuriesIcon,
  ReplyRoundedIcon,
  StickerIcon,
  ThreeDotsIcon,
} from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const PostComments = ({ postComments }: any) => {
  const theme = useTheme();
  const [activeReply, setActiveReply] = useState('');
  return (
    <>
      <CommentsFooter />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 2 }}
      >
        <Typography
          style={{
            color: theme?.palette?.grey[600],
            display: 'flex',
            alignItems: 'center',
          }}
          variant="body2"
        >
          Previous Comments <ArrowDownIcon size={18} />
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          style={{ color: theme?.palette?.primary?.main }}
        >
          Discuss Internally
        </Typography>
      </Box>
      {postComments?.map((item: any) => (
        <PostCommentsContents
          item={item}
          key={uuidv4()}
          setActiveReply={setActiveReply}
          activeReply={activeReply}
        />
      ))}
    </>
  );
};

const CommentsFooter = ({ setActiveReply }: any) => {
  return (
    <Box sx={styles?.commentsWrapper}>
      <Box>
        <Image src={DysonAvatarImage} alt="profile-image" />
      </Box>
      <Box sx={styles?.commentSection}>
        <TextField sx={styles?.chatTextarea} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button sx={styles?.unStyledButton}>
            <StickerIcon color={'#6B7280'} size={'18'} />
          </Button>
          <Button sx={styles?.unStyledButton}>
            <QuriesIcon />
          </Button>
          <Button sx={styles?.unStyledButton}>
            <AttachmentsIcon />
          </Button>
          <Button
            sx={styles?.unStyledButton}
            onClick={() => setActiveReply('')}
          >
            <PostIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const PostCommentsContents = ({ item, setActiveReply, activeReply }: any) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Box sx={{ width: '33px' }}>
        <Image
          src={item?.userImage}
          width={20}
          height={20}
          alt="profile-image"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          width: '100%',
        }}
      >
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography
            variant="body2"
            style={{ color: theme?.palette?.grey[600] }}
          >
            <strong style={{ color: '#000' }}>{item?.userName} :</strong>
            {item?.comment}
          </Typography>

          {activeReply === item?.id && (
            <CommentsFooter setActiveReply={setActiveReply} />
          )}
          {activeReply === item?.id
            ? false
            : true && (
                <Box
                  onClick={() => setActiveReply(item?.id)}
                  sx={{ display: 'flex', mt: 1, cursor: 'pointer' }}
                >
                  <ReplyRoundedIcon />
                  &nbsp;
                  <Typography
                    variant="body2"
                    style={{ color: theme?.palette?.grey[600] }}
                  >
                    Reply Comment
                  </Typography>
                </Box>
              )}

          {item?.recomment?.map((reComment: any) => (
            <Box sx={{ display: 'flex', mt: 1 }} key={uuidv4()}>
              {/* <ReplyRoundedIcon /> */}
              &nbsp;
              <Image
                src={reComment?.userImage}
                width={20}
                height={20}
                alt="profile-image"
              />
              &nbsp;
              <Typography>
                <strong style={{ color: '#000' }}>{item?.userName} :</strong>
                {reComment?.comment}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={styles?.unStyledButton}
        >
          <ThreeDotsIcon color="black" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Comment Activity</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Add Label</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default PostComments;
