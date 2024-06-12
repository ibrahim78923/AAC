import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteCommonMeetingsLocationsMutation } from '@/services/commonFeatures/meetings/settings/locations';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteLocations = (props: any) => {
  const {
    setIsPortalOpen,
    setPage,
    totalRecords,
    page,
    getMeetingsLocationListData,
    isPortalOpen,
  } = props;

  const [
    deleteCommonMeetingsLocationsTrigger,
    deleteCommonMeetingsLocationsStatus,
  ] = useDeleteCommonMeetingsLocationsMutation();

  const deleteMeetingsLocation = async () => {
    const deleteMeetingsLocationParameter = {
      queryParams: { id: isPortalOpen?.data?._id },
    };

    try {
      await deleteCommonMeetingsLocationsTrigger(
        deleteMeetingsLocationParameter,
      )?.unwrap();
      successSnackbar('Record deleted successfully');
      closeDeleteModal?.();
      const newPage = totalRecords === SELECTED_ARRAY_LENGTH?.ONE ? 1 : page;
      setPage?.(newPage);
      await getMeetingsLocationListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteMeetingsLocation,
    closeDeleteModal,
    deleteCommonMeetingsLocationsStatus,
  };
};
