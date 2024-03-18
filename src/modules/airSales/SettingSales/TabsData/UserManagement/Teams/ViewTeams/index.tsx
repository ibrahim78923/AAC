import CommonDrawer from '@/components/CommonDrawer';
import { AddCircle } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from '../Teams.style';
import MemberDetails from '../MemberDetails';
import { v4 as uuidv4 } from 'uuid';

const ViewTeams = (props: any) => {
  const theme = useTheme();
  const { isTeamDrawer, setIsTeamDrawer, teamData } = props;
  return (
    <CommonDrawer
      isDrawerOpen={isTeamDrawer}
      onClose={() => setIsTeamDrawer(false)}
      title={teamData?.data?.name}
      okText={'Add'}
      footer={true}
      isOk={true}
    >
      <>
        <Box sx={styles?.activeMemberBox(theme)}>
          <Typography>Number of active Team Members</Typography>
          <Typography>{teamData?.data?.users?.length}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginY: '1.5rem',
            paddingX: '5px',
          }}
        >
          <Typography>Members detail</Typography>
          <AddCircle sx={{ color: '#A0A3BD', cursor: 'pointer' }} />
        </Box>
        {teamData?.data?.users?.length === 0 && (
          <Typography
            variant="body2"
            textAlign="center"
            mt={5}
            fontWeight={500}
            color={theme?.palette?.grey[500]}
          >
            No Member Found
          </Typography>
        )}

        {teamData?.data?.users?.map((item: any) => (
          <MemberDetails
            key={uuidv4()}
            img={item?.img}
            name={`${item?.firstName ?? 'N/A'} ${item?.lastName}`}
            email={item?.email ?? 'N/A'}
            designation={item?.designation ?? 'N/A'}
          />
        ))}
      </>
    </CommonDrawer>
  );
};

export default ViewTeams;
