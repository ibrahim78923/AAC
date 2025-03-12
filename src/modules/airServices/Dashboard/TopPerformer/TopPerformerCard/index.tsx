import { Badge, Box, Typography } from '@mui/material';
import { fullName, getInitialsSingleName } from '@/utils/avatarUtils';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';
import { useMemo } from 'react';
import { AGENT_LEVELS } from '@/constants/services';

export const TopPerformerCard = (props: any) => {
  const {
    hasBorderBottom = true,
    name,
    department,
    badges,
    totalPoints,
    masterPoints,
    agent,
  } = props;

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
      sx={{
        p: 2,
        borderBottom: hasBorderBottom ? '1px solid' : '',
        borderColor: 'grey.700',
      }}
    >
      <Box display={'flex'} gap={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <StaticAvatar
              alt={badges}
              avatarSrc={AGENT_LEVELS_IMAGES?.[badges]}
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
        sx={{ textTransform: 'capitalize', mt: 1 }}
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
    </Box>
  );
};
