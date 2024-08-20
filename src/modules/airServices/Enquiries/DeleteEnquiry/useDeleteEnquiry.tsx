import { useDeleteEnquiriesMutation } from '@/services/airServices/enquiries';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IChildModalState } from '../Enquiries.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export default function useDeleteEnquiry({
  isModalOpen,
  onClose,
}: IChildModalState) {
  const [deleteEnquiriesTrigger, deleteEnquiriesStatus] =
    useDeleteEnquiriesMutation();

  const deleteEnquiry = async () => {
    const ids = isModalOpen?.data?.map((item: any) => item?._id)?.join(',');

    const deleteEnquiriesParameter = {
      queryParams: ids,
    };

    try {
      await deleteEnquiriesTrigger(deleteEnquiriesParameter)?.unwrap();
      successSnackbar('Enquiries deleted successfully!');
      onClose?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      onClose?.();
    }
  };

  return { deleteEnquiry, deleteEnquiriesStatus };
}
