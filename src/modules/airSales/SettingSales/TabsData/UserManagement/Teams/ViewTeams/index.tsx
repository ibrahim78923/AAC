import CommonDrawer from '@/components/CommonDrawer';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { styles } from '../Teams.style';
import MemberDetails from '../MemberDetails';
import { v4 as uuidv4 } from 'uuid';
import useUserManagement from '../../useUserManagement';
import { capitalizeFirstLetter } from '@/utils/api';
import { ViewTeamsPropsI } from '../Teams.interface';

const ViewTeams = (props: ViewTeamsPropsI) => {
  const theme = useTheme();
  const { isTeamDrawer, setIsTeamDrawer, teamData, teamByIdLoading } = props;
  const { skeletonLines } = useUserManagement();

  return (
    <CommonDrawer
      isDrawerOpen={isTeamDrawer}
      onClose={() => setIsTeamDrawer(false)}
      title={teamData?.data?.name}
      okText={'Add'}
      footer={false}
      isOk={true}
    >
      {teamByIdLoading ? (
        <Box>{skeletonLines}</Box>
      ) : (
        <Box>
          <Box sx={styles?.activeMemberBox(theme)}>
            <Typography>Number of active Team Members</Typography>
            <Typography>{teamData?.data?.accounts?.length}</Typography>
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
          </Box>
          {teamData?.data?.accounts?.length === 0 && (
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

          {teamData?.data?.accounts?.map((item: any) => (
            <MemberDetails
              key={uuidv4()}
              img={item?.user?.avatar?.url}
              name={`${
                capitalizeFirstLetter(item?.user?.firstName) ?? 'N/A'
              } ${capitalizeFirstLetter(item?.user?.lastName)}`}
              email={item?.user?.email ?? 'N/A'}
              designation={item?.user?.jobTitle ?? 'N/A'}
            />
          ))}
        </Box>
      )}
    </CommonDrawer>
  );
};

export default ViewTeams;
