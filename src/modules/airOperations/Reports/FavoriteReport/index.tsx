import { useFavoriteReport } from './useFavoriteReport';
import { CheckedFavoriteIcon, UnCheckedFavoriteIcon } from '@/assets/icons';
import { Box, Checkbox, CircularProgress } from '@mui/material';

export const FavoriteReport = (props: any) => {
  const { reportId, isFavorite, isDisabled } = props;
  const { showLoader, addReportToFavorite } = useFavoriteReport(props);

  if (showLoader)
    return (
      <Box px={1} py={0.6}>
        <CircularProgress size={24} />
      </Box>
    );

  return (
    <Checkbox
      icon={<UnCheckedFavoriteIcon />}
      checkedIcon={<CheckedFavoriteIcon />}
      checked={isFavorite}
      onChange={(e: any) => addReportToFavorite(e, reportId)}
      disabled={isDisabled}
      color="primary"
      name={reportId}
    />
  );
};
