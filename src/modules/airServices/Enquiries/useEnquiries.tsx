import { PAGINATION } from '@/config';
import { useState } from 'react';
import {
  useGetEnquiriesQuery,
  usePatchEnquiriesMutation,
} from '@/services/airServices/enquiries';
import {
  getEnquiriesActionDropdown,
  getEnquiriesColumns,
} from './Enquiries.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import useAuth from '@/hooks/useAuth';

export default function useEnquiries() {
  const [enquiriesSelected, setEnquiriesSelected] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [filter, setFilter] = useState('');

  const [isModalOpen, setIsModalOpen] = useState({
    filterOpen: false,
    viewOpen: false,
    deleteOpen: false,
    convertToTicket: false,
    createRequester: false,
    data: null,
  });

  const enquiriesActionDropdown = getEnquiriesActionDropdown({
    enquiriesSelected,
    setIsModalOpen,
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const auth: any = useAuth();
  const { _id: companyAccountId } = auth?.product?.accounts?.[0]?.company;

  const params = {
    page: page,
    limit: pageLimit,
    search: searchBy?.length ? searchBy : undefined,
    status: filter?.length ? filter : undefined,
    companyAccountId,
  };

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetEnquiriesQuery({ params }, { refetchOnMountOrArgChange: true });

  const [patchEnquiriesTrigger, patchEnquiriesStatus] =
    usePatchEnquiriesMutation();

  const handleStatusChange = async (info: any, event: any) => {
    const patchEnquiriesParameter = {
      queryParams: info?._id,
      body: { status: event?.target?.value },
    };

    try {
      await patchEnquiriesTrigger(patchEnquiriesParameter)?.unwrap();
      setEnquiriesSelected([]);
      successSnackbar('Status Updated successfully!');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const enquiriesColumns = getEnquiriesColumns({
    enquiriesSelected,
    setEnquiriesSelected,
    dataArray: data?.data?.enquiries,
    handleStatusChange,
    patchEnquiriesStatus,
  });

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
  };
}
