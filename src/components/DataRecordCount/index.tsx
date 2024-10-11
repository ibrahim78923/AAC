import { Box, CircularProgress, Typography } from '@mui/material';

export const DataRecordCount = (props: any) => {
  const {
    isCountLoading = false,
    totalCount = 0,
    recordName,
    color = 'secondary.main',
  } = props;

  return (
    <Box display={'flex'} alignItems={'center'} pb={0.5} px={2} gap={1}>
      <Typography variant="h6" color={color}>
        {recordName}
      </Typography>
      <Typography
        variant="body2"
        bgcolor={color}
        color={'common.white'}
        px={0.5}
        ml={1}
        borderRadius={1}
      >
        {isCountLoading ? (
          <CircularProgress size={18} />
        ) : totalCount < 10 ? (
          `0${totalCount}`
        ) : (
          totalCount
        )}
      </Typography>
    </Box>
  );
};
