import { Box, Grid, Skeleton } from '@mui/material';

export const SkeletonCard = (props: any) => {
  const {
    length = 4,
    outerPadding = { x: 1, y: 1 },
    hasCircularSkeleton = true,
    hasThirdSkeleton = true,
    flexDirection = 'row',
    gridSize,
    circularSkeletionSize,
  } = props;

  return (
    <Grid container spacing={2}>
      {Array.from({ length })?.map((item: any, id: any) => (
        <Grid key={item ?? `skeleton+${id}`} item xs={12} md={4} {...gridSize}>
          <Box
            display="flex"
            alignItems={'center'}
            gap={2}
            justifyContent={'space-between'}
            flexDirection={flexDirection}
            px={outerPadding?.x ?? 1}
            py={outerPadding?.y ?? 1}
            borderRadius={2}
            border={'1px solid'}
            borderColor={'custom.off_white_three'}
          >
            {hasCircularSkeleton && (
              <Skeleton
                animation="wave"
                variant={'circular'}
                width={
                  flexDirection === 'column'
                    ? circularSkeletionSize?.width ?? 50
                    : circularSkeletionSize?.width ?? 100
                }
                height={circularSkeletionSize?.height ?? 50}
                sx={{
                  bgcolor: 'grey.300',
                  border: '1px solid',
                  borderColor: 'custom.off_white_three',
                }}
              />
            )}
            <Skeleton
              animation="wave"
              variant={'rectangular'}
              width={'100%'}
              height={25}
              sx={{
                bgcolor: 'grey.300',
                border: '1px solid',
                borderColor: 'custom.off_white_three',
              }}
            />
            {hasThirdSkeleton && (
              <Skeleton
                animation="wave"
                variant={'rectangular'}
                width={'100%'}
                height={25}
                sx={{
                  bgcolor: 'grey.300',
                  border: '1px solid',
                  borderColor: 'custom.off_white_three',
                }}
              />
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
