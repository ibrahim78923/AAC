import { useFavoriteReport } from './useFavoriteReport';
import { CheckedFavoriteIcon, UnCheckedFavoriteIcon } from '@/assets/icons';
import { Checkbox, CircularProgress } from '@mui/material';

export const FavoriteReport = (props: any) => {
  const { reportId, isFavorite } = props;
  const { showLoader, addReportToFavorite, addReportToFavoriteListStatus } =
    useFavoriteReport(props);

  if (showLoader) return <CircularProgress size={20} />;

  return (
    <Checkbox
      icon={<UnCheckedFavoriteIcon />}
      checkedIcon={<CheckedFavoriteIcon />}
      checked={isFavorite}
      onChange={(e: any) => addReportToFavorite(e, reportId)}
      disabled={addReportToFavoriteListStatus?.isLoading}
      color="primary"
      name={reportId}
    />
  );
};
