import { pxToRem } from '@/utils/getFontValue';
import { Box, CircularProgress, Typography } from '@mui/material';

export const DataRecordCount = (props: any) => {
  const {
    isCountLoading = false,
    totalCount = 0,
    recordName,
    color = 'secondary.main',
    recordNameVariant = 'h6',
  } = props;

  return (
    <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
      <Box
        bgcolor={color}
        color={'common.white'}
        borderRadius={1}
        p={0.5}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        minWidth={pxToRem(30)}
        height={pxToRem(30)}
      >
        {isCountLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="body2">
            {totalCount < 10 ? `0${totalCount}` : totalCount}
          </Typography>
        )}
      </Box>
      <Typography variant={recordNameVariant} color={color}>
        {recordName}
      </Typography>
    </Box>
  );
};
