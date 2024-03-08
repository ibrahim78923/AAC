import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetAssetsSoftwareQuery,
  usePostSoftwareMutation,
  useLazyGetUserDropdownQuery,
} from '@/services/airServices/assets/software';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from './UpsertSoftware/UpsertSoftware.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useSoftware = () => {
  const router = useRouter();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFilterValues] = useState({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const apiDataParameter = {
    page,
    limit: pageLimit,
    ...filterValues,
    search: searchValue,
  };

  const { data, isLoading, isError, isSuccess } =
    useGetAssetsSoftwareQuery(apiDataParameter);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const assetsSoftwares =
    data?.data?.assetssoftwares?.map?.((software: any) => ({
      id: software?._id,
      Software: software?.name ?? '---',
      Status: software?.status ?? '---',
      Category: software?.details?.category ?? '---',
      ContractValue: software?.contractValue ?? '---',
      ManagedBy:
        `${software?.managedByDetails?.firstName}  ${software?.managedByDetails?.lastName}` ??
        '---',
      Users: software?.users ?? '---',
      Installs: software?.installs ?? '---',
      Type: software?.type ?? '---',
      publisher: software?.details?.publisher ?? '---',
    })) || [];
  const paginationData = data?.data?.meta;
  const [postSoftwareTrigger, { isLoading: upsertLoading }] =
    usePostSoftwareMutation();
  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues: upsertSoftwareFormDefaultValues(null),
  });
  const { handleSubmit, reset } = methods;
  const submitUpsertSoftware = async (formData: any) => {
    const modifiedData = {
      name: formData?.name,
      status: formData?.status,
      type: formData?.type,
      details: {
        description: formData?.description,
        category: formData?.category,
        publisher: formData?.publisher,
        managedBy: formData?.managedBy?._id,
      },
    };
    try {
      const response: any = await postSoftwareTrigger(modifiedData);
      successSnackbar(
        response?.data?.message && 'Software Created Successfully',
      );
      setIsAddDrawerOpen(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.error ?? 'An error');
    }
  };
  const submitHandler = handleSubmit(submitUpsertSoftware);
  const onClose = () => {
    setIsAddDrawerOpen(false);
    reset();
  };
  const userQuery = useLazyGetUserDropdownQuery();
  return {
    router,
    assetsSoftwares,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    softwareData,
    setSoftwareData,
    openAssignModal,
    setOpenAssignModal,
    searchValue,
    setSearchValue,
    page,
    setPage,
    isLoading,
    isError,
    isSuccess,
    setPageLimit,
    paginationData,
    pageLimit,
    handlePageChange,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    methods,
    submitHandler,
    upsertLoading,
    onClose,
    userQuery,
  };
};
