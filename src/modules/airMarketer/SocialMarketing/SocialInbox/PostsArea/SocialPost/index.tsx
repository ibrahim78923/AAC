import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Typography, useTheme } from '@mui/material';

import {
  FacebookImage,
  InstagramImage,
  ThumbsUpImage,
  TwitterImage,
  UsersAvatarRoundedImage,
} from '@/assets/images';
import {
  CommentIcon,
  LikeIcon,
  ShareIcon,
  UserCircleIcon,
  ViewExpandedIcon,
} from '@/assets/icons';

import {
  inboxPostData,
  userProfile,
} from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

import { styles } from './SocialPost.style';
import CommonModal from '@/components/CommonModal';
import { v4 as uuidv4 } from 'uuid';
import PostComments from './PostComments';

const SocialPost = () => {
  const theme = useTheme();
  const [isUserViewModal, setIsUserViewModal] = useState(false);
  const [activeUserProfile, setActiveUserProfile] = useState(userProfile);
  return (
    <>
      <Box sx={styles?.mainPostsWrapper}>
        {inboxPostData?.map((post) => (
          <Box sx={styles?.postCard} key={uuidv4()}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Box>
                  <Image src={post?.userImage} alt="profile-image" />
                </Box>
                <Box>
                  <Typography variant="h5">{post?.userName}</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: theme?.palette?.grey[600] }}
                  >
                    {post?.postedTime}
                  </Typography>
                </Box>
              </Box>
              <Button
                startIcon={<UserCircleIcon />}
                variant="outlined"
                onClick={() => {
                  setIsUserViewModal(true), setActiveUserProfile(userProfile);
                }}
              >
                View User Profile
              </Button>
            </Box>
            <Box sx={{ mt: 1, mb: 1 }}>
              <Typography variant="body2" color={'#6E7191'}>
                {post?.discription}
              </Typography>
              <Typography variant="body2" color={'#0257BC'} sx={{ mt: 1 }}>
                See Translation
              </Typography>
            </Box>
            <Box sx={styles?.gallery}>
              <Image src={post?.postImage} alt="post" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Typography variant="body2" sx={{ display: 'flex', gap: '6px' }}>
                <Image src={ThumbsUpImage} alt="s" />
                {post?.likes}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', gap: '6px' }}
                color={theme?.palette?.grey[600]}
              >
                <ViewExpandedIcon /> View On
                <strong style={{ color: '#1877F2' }}>Facebook</strong>
              </Typography>
            </Box>
            <Box sx={styles?.reactionsGripper}>
              <Box sx={styles?.reactionsFlex}>
                <Box sx={styles?.boxReaction}>
                  <LikeIcon />
                  Like
                </Box>
                <Box sx={styles?.boxReaction}>
                  <CommentIcon />
                  Comment
                </Box>
                <Box sx={styles?.boxReaction}>
                  <ShareIcon />
                  Share
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Typography
                  variant="body2"
                  color={theme?.palette?.grey[600]}
                  sx={{ display: 'flex', gap: '6px' }}
                >
                  {post?.comments} Comments
                </Typography>
                <Typography
                  variant="body2"
                  color={theme?.palette?.grey[600]}
                  sx={{ display: 'flex', gap: '6px' }}
                >
                  {post?.shares} Shares
                </Typography>
              </Box>
            </Box>
            <PostComments postComments={post?.postComments} />
          </Box>
        ))}

        <CommonModal
          open={isUserViewModal}
          handleClose={() => setIsUserViewModal(false)}
          title={'Profile'}
          okText={''}
          footer={false}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Image
              src={activeUserProfile?.userImage}
              alt="user"
              width={95}
              height={95}
              style={{ borderRadius: '50%' }}
            />
            <Typography
              variant="h5"
              color={theme?.palette?.common?.black}
              fontWeight={500}
              sx={{ display: 'flex', gap: '6px' }}
            >
              {activeUserProfile?.userName}
            </Typography>

            <Box
              sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
            >
              <Box sx={styles?.userProfiles}>
                <Image
                  src={UsersAvatarRoundedImage}
                  alt="user"
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
                <Box sx={styles?.bottomIcon}>
                  <Image src={InstagramImage} alt="user" />
                </Box>
              </Box>
              <Box sx={styles?.userProfiles}>
                <Image
                  src={UsersAvatarRoundedImage}
                  alt="user"
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
                <Box sx={styles?.bottomIcon}>
                  <Image src={FacebookImage} alt="user" />
                </Box>
              </Box>
              <Box sx={styles?.userProfiles}>
                <Image
                  src={UsersAvatarRoundedImage}
                  alt="user"
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
                <Box sx={styles?.bottomIcon}>
                  <Image src={TwitterImage} alt="user" />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '20px' }}>
              {activeUserProfile?.stats?.map((stat: any) => (
                <Box key={uuidv4()}>
                  <Typography
                    variant="h5"
                    sx={styles?.profileStats}
                    color={theme?.palette?.grey[600]}
                  >
                    {stat?.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={styles?.profileStats}
                    color={theme?.palette?.grey[600]}
                  >
                    {stat?.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CommonModal>
      </Box>
    </>
  );
};

export default SocialPost;
