import { Badge, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { useTopPerformer } from './useTopPerformer';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { fullName, generateImage } from '@/utils/avatarUtils';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';

export const TopPerformer = () => {
  const { data, isLoading, isError, isFetching } = useTopPerformer();

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor={'grey.700'}
      height={'100%'}
    >
      <Typography variant="h5" color="slateBlue.main">
        Top Performer
      </Typography>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState height="100%" />
      ) : !!!data ? (
        <NoData height={'100%'} message="No Top Performer" />
      ) : (
        <>
          <Box display={'flex'} gap={2} marginY={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar
                  alt={data?.badges}
                  src={AGENT_LEVELS_IMAGES?.[data?.badges]?.src}
                  sx={{ width: 22, height: 22 }}
                />
              }
            >
              <Avatar
                alt={fullName(data?.name)}
                src={generateImage(data?.userAvatar)}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Badge>
            <Box>
              <Typography variant="body2" fontWeight={600} color={'grey.600'}>
                {fullName(data?.name)}
              </Typography>
              <Typography variant="body3" color={'grey.600'}>
                {data?.department}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color={'grey.600'} mb={0.5}>
            {data?.badges}
          </Typography>
          <Typography variant="body3" color={'primary.main'}>
            {data?.totalPoints}%
          </Typography>
          <LinearProgress value={data?.totalPoints} variant="determinate" />
        </>
      )}
    </Box>
  );
};
