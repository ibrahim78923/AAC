import { Box, Skeleton } from '@mui/material';
import { SkeletonTablePropsI } from '../Skeletons.interface';

const SkeletonTable = (props: SkeletonTablePropsI) => {
  const { length = 4 } = props;
  return (
    <>
      {Array.from({ length })?.map((item: any, id: any) => (
        <Box key={item ?? `skeleton+${id}`}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={'100%'}
            height={50}
            sx={{
              bgcolor: 'grey.300',
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: 2,
              my: 2,
            }}
          />
        </Box>
      ))}
    </>
  );
};

export default SkeletonTable;
