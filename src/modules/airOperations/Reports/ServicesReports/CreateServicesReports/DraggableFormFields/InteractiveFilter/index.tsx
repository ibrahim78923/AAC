import { Box, Typography } from '@mui/material';

export const InteractiveFilter = (props: any) => {
  const { filterType } = props;
  return (
    <Box border={1} borderColor={'grey.700'} p={1} borderRadius={2}>
      {filterType ? (
        <>{filterType}</>
      ) : (
        <>
          <Box p={10}>
            <Typography
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              variant="h5"
            >
              Filter
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
