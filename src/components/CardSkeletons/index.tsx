import { Box, Skeleton } from '@mui/material';

const SkeletonComponent = ({ numberOfSkeletons }: any) => {
  const skeletonLines = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletonLines.push(
      <Box
        display="flex"
        width="100%"
        gap={1}
        sx={{ my: 3 }}
        alignItems="center"
        key={i}
      >
        <Skeleton
          animation="wave"
          variant="circular"
          width="45px"
          height="45px"
        />
        <Box>
          <Skeleton animation="wave" width="300px" height="20px" />
          <Skeleton animation="wave" width="300px" height="20px" />
        </Box>
      </Box>,
    );
  }

  return <div>{skeletonLines}</div>;
};

export default SkeletonComponent;
