import { Box, Skeleton } from '@mui/material';

export const SkeletonTanStackTable = (props: any) => {
  const { length = 4 } = props;

  return (
    <Box border={'1px solid'} borderColor={'custom.off_white_three'}>
      <Skeleton
        variant="rounded"
        width={'100%'}
        height={50}
        sx={{
          bgcolor: 'grey.100',
          border: '1px solid',
          borderColor: 'custom.off_white_three',
        }}
      />
      {Array.from({ length })?.map((item: any, id: any) => (
        <Box
          key={item ?? `skeleton+${id}`}
          borderBottom={'1px solid'}
          borderColor={'custom.off_white_three'}
          p={2}
        >
          <Skeleton
            animation="wave"
            variant="rounded"
            width={'95%'}
            height={50}
            sx={{
              bgcolor: 'grey.300',
              border: '1px solid',
              borderColor: 'grey.400',
              margin: 'auto',
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
