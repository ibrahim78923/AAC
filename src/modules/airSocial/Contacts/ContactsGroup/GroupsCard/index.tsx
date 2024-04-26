import React, { useState } from 'react';
import { Avatar, AvatarGroup, Box, Typography, useTheme } from '@mui/material';
import { styles } from '../Contacts.style';
import GroupActions from './GroupActions';

const GroupsCard = ({ info, handleOpenModal, handleOpenDeleteAlert }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openActions = Boolean(anchorEl);
  const handleClickActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={styles?.groupsCard}>
        <Typography variant="body1" fontWeight={600}>
          {info?.name}
        </Typography>
        <Typography variant="body1" fontSize={'12'}>
          Contacts ({info?.contacts?.length})
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `1px solid ${theme?.palette?.grey[300]}`,
            paddingTop: '8px',
            marginTop: '8px',
          }}
        >
          <AvatarGroup
            max={5}
            sx={{
              '& .MuiAvatar-colorDefault': {
                border: `2px solid ${theme?.palette?.grey[400]}`,
                backgroundColor: `${theme?.palette?.primary?.main}`,
                fontSize: '12px',
                width: '25px !important',
                height: '25px !important',
              },
              '& .MuiAvatar-root ': {
                width: '25px !important',
                height: '25px !important',
              },
            }}
          >
            {info?.contacts?.map((user: any) => (
              <Avatar key={user?._id} src={user?.srcImage} />
            ))}
          </AvatarGroup>
          <Box>
            <GroupActions
              handleOpenModal={handleOpenModal}
              handleDelete={handleOpenDeleteAlert}
              anchorEl={anchorEl}
              openActions={openActions}
              handleClickActions={handleClickActions}
              handleCloseActions={handleCloseActions}
              groupData={info}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GroupsCard;
