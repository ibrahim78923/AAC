import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { AlertModals } from '@/components/AlertModals';
import ReComment from './ReComment';
import CommonModal from '@/components/CommonModal';
import DiscussInternallyDrawer from './DiscussInternallyDrawer';
import Search from '@/components/Search';

import {
  ArrowDownIcon,
  AttachmentsIcon,
  CloseDrawerIcon,
  PostIcon,
  QuriesIcon,
  ReplyRoundedIcon,
  StickerIcon,
  ThreeDotsIcon,
} from '@/assets/icons';

import {
  commentActivity,
  quickReplies,
} from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

import { DysonAvatarImage } from '@/assets/images';
import { styles } from './PostComments.style';

import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@/assets/icons/shared/close-icon';

const PostComments = ({ postComments }: any) => {
  const theme = useTheme();
  const [activeReply, setActiveReply] = useState('');
  const [isDiscussInternally, setIsDiscussInternally] = useState(false);

  return (
    <>
      <CommentsFooter />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '@media (max-width:500px)': {
            alignItems: 'flex-start',
            flexDirection: 'column-reverse',
          },
          justifyContent: 'space-between',
          mt: 1,
          mb: 2,
        }}
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
        <Button
          sx={{ padding: '0' }}
          onClick={() => setIsDiscussInternally(true)}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ color: theme?.palette?.primary?.main }}
          >
            Discuss Internally
          </Typography>
        </Button>
      </Box>
      {postComments?.map((item: any) => (
        <PostCommentsContents
          item={item}
          key={uuidv4()}
          setActiveReply={setActiveReply}
          activeReply={activeReply}
        />
      ))}
      <DiscussInternallyDrawer
        setIsDiscussInternally={setIsDiscussInternally}
        isDiscussInternally={isDiscussInternally}
      />
    </>
  );
};

const CommentsFooter = ({ setActiveReply }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box sx={styles?.commentsWrapper}>
        <Box>
          <Image src={DysonAvatarImage} alt="profile-image" />
        </Box>
        <Box sx={styles?.commentSection}>
          <TextField
            sx={styles?.chatTextarea}
            placeholder="Write your comment here"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button sx={styles?.unStyledButton}>
              <StickerIcon color={'#6B7280'} size={'18'} />
            </Button>
            <Button
              sx={styles?.unStyledButton}
              aria-describedby={id}
              onClick={handleClick}
            >
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            width: '490px',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5">Quick Replies</Typography>
            <Box sx={styles?.unStyledButton} onClick={handleClose}>
              <CloseDrawerIcon />
            </Box>
          </Box>

          {quickReplies?.map((reply: any) => (
            <Box sx={{ mb: 3 }} key={uuidv4()}>
              <Typography variant="body2" fontWeight={600}>
                {reply?.title}:
              </Typography>
              <Typography variant="body2">{reply?.content}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

const PostCommentsContents = ({ item, setActiveReply, activeReply }: any) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const [isCommentActivity, setIsCommentActivity] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElLabel, setAnchorElLabel] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickLabel = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLabel(event.currentTarget);
  };

  const handleCloseLabel = () => {
    setAnchorElLabel(null);
  };

  const openLabel = Boolean(anchorElLabel);
  const idLabel = openLabel ? 'simple-popover' : undefined;

  const labelsData = [
    {
      id: '1',
      title: 'Follow-Up',
      background: theme?.palette?.warning?.main,
      color: theme?.palette?.common?.white,
    },
    {
      id: '2',
      title: 'Priority',
      background: theme?.palette?.success?.main,
      color: theme?.palette?.common?.white,
    },
  ];

  return (
    <>
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
              <ReComment reComment={reComment} item={item} key={uuidv4()} />
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
            <MenuItem
              onClick={() => {
                handleClose;
                setIsCommentActivity(true);
              }}
            >
              Comment Activity
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsDeleteModal(true), setAnchorEl(null);
              }}
            >
              Delete
            </MenuItem>
            <Button
              fullWidth
              sx={{
                textAlign: 'left',
                '& .MuiButtonBase-root': {
                  width: '200px',
                  padding: '0px 9px',
                },
              }}
              aria-describedby={idLabel}
              onClick={handleClickLabel}
            >
              <MenuItem sx={{ fontWeight: '400', color: '#000' }}>
                Add Label
              </MenuItem>
            </Button>
          </Menu>
        </Box>
      </Box>

      <Popover
        id={idLabel}
        open={openLabel}
        anchorEl={anchorElLabel}
        onClose={handleCloseLabel}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            width: '230px',
            padding: '20px',
          },
        }}
      >
        <Typography variant="body1" fontWeight={500} sx={{ mb: 2 }}>
          Label
        </Typography>

        <Search
          searchBy={searchTerm}
          setSearchBy={setSearchTerm}
          label="Search"
          fullWidth
          size="small"
        />

        {labelsData?.map((item: any) => (
          <Box
            sx={{
              backgroundColor: item?.background,
              padding: '5px 12px',
              borderRadius: '8px',
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              mb: 1,
              marginTop: '15px',
            }}
            key={uuidv4()}
          >
            <Typography variant="body2" sx={{ color: item?.color }}>
              {item?.title}
            </Typography>
            <CloseIcon
              size={['10', '10']}
              color={theme?.palette?.common?.white}
            />
          </Box>
        ))}
      </Popover>

      <AlertModals
        message={'Are you sure you want to delete this Comment?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />

      <CommonModal
        open={isCommentActivity}
        handleClose={() => setIsCommentActivity(false)}
        handleCancel={() => setIsCommentActivity(false)}
        handleSubmit={() => setIsCommentActivity(false)}
        title="Comment Activity"
      >
        <Box>
          {commentActivity?.map((item: any) => (
            <Grid container spacing={2} key={uuidv4()} mb={2}>
              <Grid item xs={1.2}>
                <Image
                  src={item?.userImage}
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                  alt="user"
                />
              </Grid>
              <Grid item xs={10.8}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {item?.userName}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.grayish_blue }}
                  >
                    {item?.date}, {item?.time}
                  </Typography>
                  <br />
                  <Typography variant="body3">{item?.comment}</Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </CommonModal>
    </>
  );
};

export default PostComments;
