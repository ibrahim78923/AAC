import { PAGINATION } from '@/config';
import { ChangeEvent, useMemo, useState } from 'react';
import {
  useGetServicesEnquiriesQuery,
  usePatchServicesEnquiriesMutation,
} from '@/services/airServices/enquiries';
import {
  getEnquiriesActionDropdown,
  getEnquiriesColumns,
} from './Enquiries.data';
import { IEnquiry, IInfo, IModalState } from './Enquiries.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { getActiveAccountSession } from '@/utils';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useEnquiries = () => {
  const [enquiriesSelected, setEnquiriesSelected] = useState<IEnquiry[]>([]);
  const [searchBy, setSearchBy] = useState('');
  const [filter, setFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState<IModalState>({
    filterOpen: false,
    viewOpen: false,
    deleteOpen: false,
    convertToTicket: false,
    data: null,
  });

  const enquiriesActionDropdown = getEnquiriesActionDropdown({
    enquiriesSelected,
    setIsModalOpen,
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyAccountId = product?.company?._id;

  const params = {
    page: page,
    limit: pageLimit,
    search: searchBy?.length ? searchBy : undefined,
    status: filter?.length ? filter : undefined,
    companyAccountId,
  };

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetServicesEnquiriesQuery(
      { params },
      { refetchOnMountOrArgChange: true },
    );

  const [patchEnquiriesTrigger, patchEnquiriesStatus] =
    usePatchServicesEnquiriesMutation();

  const handleStatusChange = async (
    info: IInfo,
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const patchEnquiriesParameter = {
      queryParams: info?._id,
      body: { status: event?.target?.value },
    };

    try {
      await patchEnquiriesTrigger(patchEnquiriesParameter)?.unwrap();
      setEnquiriesSelected([]);
      successSnackbar('Status Updated successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const enquiriesColumns = getEnquiriesColumns({
    enquiriesSelected,
    setEnquiriesSelected,
    dataArray: data?.data?.enquiries || [],
    handleStatusChange,
    patchEnquiriesStatus,
  });

  const closeModal = () => {
    setIsModalOpen({
      filterOpen: false,
      viewOpen: false,
      deleteOpen: false,
      convertToTicket: false,
      data: null,
    });
    setEnquiriesSelected([]);
  };
  const openFilterModal = () => {
    setIsModalOpen({
      filterOpen: true,
      viewOpen: false,
      deleteOpen: false,
      convertToTicket: false,
      data: null,
    });
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };

  return {
    setSearchBy,
    isModalOpen,
    setIsModalOpen,
    data,
    enquiriesColumns,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    setPageLimit,
    setPage,
    setFilter,
    enquiriesActionDropdown,
    enquiriesSelected,
    setEnquiriesSelected,
    closeModal,
    openFilterModal,
    handleSearch,
  };
};

export default useEnquiries;
