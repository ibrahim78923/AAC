import { Box, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import { Fragment, useMemo } from 'react';
import { TopPerformerCard } from './TopPerformerCard';

const TOP_PERFORMERS_LENGTH = 3;

export const TopPerformer = (props: any) => {
  const { data } = props;

  const hasTopPerformers = useMemo(
    () =>
      data?.topPerformer?.data
        ?.filter((performer: any) => performer?.topPerformer)
        ?.slice(0, TOP_PERFORMERS_LENGTH),
    [data],
  );

  if (!hasTopPerformers?.length) {
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

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      maxHeight="100%"
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
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
      <Box flex={1}>
        {hasTopPerformers?.map((topPerformer: any) => (
          <Fragment key={topPerformer?._id}>
            <TopPerformerCard
              name={topPerformer?.name}
              department={topPerformer?.department}
              badges={topPerformer?.badges}
              totalPoints={topPerformer?.totalPoints}
              masterPoints={topPerformer?.masterPoints}
              agent={topPerformer?.agent}
            />
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
