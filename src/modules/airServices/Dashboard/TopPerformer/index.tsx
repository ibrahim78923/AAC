import { Badge, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { fullName, generateImage } from '@/utils/avatarUtils';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';
import { AGENT_LEVELS } from '@/constants/strings';
import NoData from '@/components/NoData';

export const TopPerformer = (props: any) => {
  const { data } = props;

  const hasTopPerformer = data?.topPerformer?.data?.find(
    (performer: any) => performer?.topPerformer,
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
        {!!!hasTopPerformer ? (
          <NoData height={'100%'} message="No Top Performer" />
        ) : (
          <>
            <Box display={'flex'} gap={2} marginY={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar
                    alt={hasTopPerformer?.badges}
                    src={AGENT_LEVELS_IMAGES?.[hasTopPerformer?.badges]?.src}
                    sx={{ width: 22, height: 22 }}
                  />
                }
              >
                <Avatar
                  alt={fullName(hasTopPerformer?.name)}
                  src={generateImage(hasTopPerformer?.agent?.avatar?.url)}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </Badge>
              <Box>
                <Typography variant="body2" fontWeight={600} color={'grey.600'}>
                  {fullName(hasTopPerformer?.name)}
                </Typography>
                <Typography variant="body3" color={'grey.600'}>
                  {hasTopPerformer?.department}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body1"
              color={'grey.600'}
              textTransform={'capitalize'}
            >
              {hasTopPerformer?.badges}
            </Typography>
            <Typography variant="body3" color={'slateBlue.main'}>
              {!!!hasTopPerformer?.masterPoints
                ? `${hasTopPerformer?.totalPoints} 
            points and has ${hasTopPerformer?.badges} level`
                : `${hasTopPerformer?.totalPoints} + 
            ${hasTopPerformer?.masterPoints - hasTopPerformer?.totalPoints}
            points to ${AGENT_LEVELS?.MASTER} level`}
            </Typography>
            <br />
            <Typography variant="body3" color={'primary.main'}>
              {!!!hasTopPerformer?.masterPoints
                ? 0
                : +Math?.round(
                    (hasTopPerformer?.totalPoints /
                      hasTopPerformer?.masterPoints) *
                      100,
                  )?.toFixed?.(2)}
              %
            </Typography>
            <LinearProgress
              value={
                !!!hasTopPerformer?.masterPoints
                  ? 0
                  : +Math?.round(
                      (hasTopPerformer?.totalPoints /
                        hasTopPerformer?.masterPoints) *
                        100,
                    )?.toFixed?.(2)
              }
              variant="determinate"
            />
          </>
        )}
      </Box>
    </Box>
  );
};
