import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonForm = (props: any) => {
  const { length = 4, gridSize, flexDirection = 'column' } = props;
  return (
    <Grid container spacing={2}>
      {Array?.from({ length })?.map((item: any, id: any) => (
        <Grid
          key={item ?? `skeleton+${id}`}
          item
          xs={12}
          display={'flex'}
          flexDirection={flexDirection}
          {...gridSize}
        >
          <Skeleton
            animation="wave"
            variant="rounded"
            width={'30%'}
            height={20}
            sx={{
              bgcolor: 'grey.300',
              border: '1px solid',
              borderColor: 'grey.400',
            }}
          />
          <Box
            border={'1px solid'}
            borderColor={'custom.off_white_three'}
            p={1}
            my={1}
            width={'100%'}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              width={'100%'}
              height={30}
              sx={{
                bgcolor: 'grey.300',
                border: '1px solid',
                borderColor: 'grey.400',
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonForm;
