import { Badge, Box, Typography } from '@mui/material';
import { fullName, getInitialsSingleName } from '@/utils/avatarUtils';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';
import { AGENT_LEVELS } from '@/constants/strings';
import NoData from '@/components/NoData';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';
import { useMemo } from 'react';

export const TopPerformer = (props: any) => {
  const { data } = props;

  const hasTopPerformer = useMemo(
    () =>
      data?.topPerformer?.data?.find(
        (performer: any) => performer?.topPerformer,
      ),
    [data],
  );

  if (!hasTopPerformer) {
    return (
      <Box
        borderRadius={3}
        height="100%"
        border="1px solid"
        borderColor="custom.off_white_three"
      >
        <Box
          px={2}
          py={1}
          borderBottom="1px solid"
          borderColor="custom.off_white"
        >
          <Typography variant="h5" color="slateBlue.main">
            Top Performer
          </Typography>
        </Box>
        <Box p={2}>
          <NoData height="100%" message="No Top Performer" />
        </Box>
      </Box>
    );
  }

  const { name, department, badges, totalPoints, masterPoints, agent } =
    hasTopPerformer ?? {};

  const isMasterLevel = useMemo(
    () => badges === AGENT_LEVELS?.MASTER,
    [badges],
  );
  const pointsToMasterLevel = useMemo(
    () => (masterPoints ? masterPoints - totalPoints : 0),
    [masterPoints, totalPoints],
  );
  const progressPercentage = useMemo(
    () => (masterPoints ? Math.round((totalPoints / masterPoints) * 100) : 0),
    [masterPoints, totalPoints],
  );

  return (
    <Box
      borderRadius={3}
      height={'100%'}
      border={`1px solid`}
      borderColor="custom.off_white_three"
    >
      <Box
        px={2}
        py={1}
        borderBottom={`1px solid`}
        borderColor="custom.off_white"
      >
        <Typography variant="h5" color="slateBlue.main">
          Top Performer
        </Typography>
      </Box>
      <Box p={2}>
        <>
          <Box display={'flex'} gap={2} marginY={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <StaticAvatar
                  alt={badges}
                  avatarSrc={AGENT_LEVELS_IMAGES?.[badges]?.src}
                  avatarSize={{ width: 20, height: 20 }}
                />
              }
            >
              <CustomAvatar
                nameInitial={getInitialsSingleName(name)}
                avatarSrc={agent?.avatar?.url}
                avatarSize={{
                  width: 40,
                  height: 40,
                }}
              />
            </Badge>
            <Box>
              <Typography variant="body2" fontWeight={600} color={'grey.600'}>
                {fullName(name)}
              </Typography>
              <Typography variant="body3" color={'grey.600'}>
                {department}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            color={'grey.600'}
            textTransform={'capitalize'}
          >
            {badges}
          </Typography>
          <Typography variant="body3" color={'slateBlue.main'}>
            {isMasterLevel
              ? `${totalPoints} points and has ${badges} level`
              : `${totalPoints} + ${pointsToMasterLevel} points to ${AGENT_LEVELS?.MASTER} level`}
          </Typography>
          <br />
          <Typography variant="body3" color={'primary.main'}>
            {isMasterLevel ? 100 : progressPercentage}%
          </Typography>
          <CustomLinearProgress
            value={isMasterLevel ? 100 : progressPercentage}
            variant="determinate"
          />
        </>
      </Box>
    </Box>
  );
};
