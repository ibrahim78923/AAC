// import { useDeleteEnquiriesMutation } from '@/services/airServices/enquiries';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IChildModalState } from '../Enquiries.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useDeleteServicesEnquiriesMutation } from '@/services/airServices/enquiries';

export default function useDeleteEnquiry({
  isModalOpen,
  onClose,
}: IChildModalState) {
  const [deleteEnquiriesTrigger, deleteEnquiriesStatus] =
    useDeleteServicesEnquiriesMutation();

  const deleteServicesEnquiry = async () => {
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

  return { deleteServicesEnquiry, deleteEnquiriesStatus };
}
