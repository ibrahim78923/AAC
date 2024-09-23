import { CircularProgress, Typography } from '@mui/material';

export const DataRecordCount = (props: any) => {
  const { isCountLoading = false, totalCount = 0, recordName } = props;

  return (
    <Typography variant={'h5'}>
      <Typography
        variant={'body1'}
        component={'span'}
        bgcolor={'secondary.main'}
        borderRadius={1}
        p={0.4}
        color={'common.white'}
        mr={0.5}
      >
        {isCountLoading ? (
          <CircularProgress size={18} />
        ) : totalCount < 10 ? (
          `0${totalCount}`
        ) : (
          totalCount
        )}
      </Typography>
      {recordName}
    </Typography>
  );
};
