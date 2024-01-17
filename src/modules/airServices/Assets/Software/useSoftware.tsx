import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetAssetsSoftwareQuery,
  usePostSoftwareMutation,
} from '@/services/airServices/assets/software';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from './UpsertSoftware/UpsertSoftware.data';

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

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetAssetsSoftwareQuery({
      page,
      limit: pageLimit,
      search: searchValue,
      ...filterValues,
    });

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
  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues: upsertSoftwareFormDefaultValues(null),
  });
  const { handleSubmit, reset } = methods;
  const [postSoftware] = usePostSoftwareMutation();
  const submitUpsertSoftwareForm = async (formData: any) => {
    const modifiedData = {
      name: formData?.name,
      details: {
        description: formData?.description,
        publisher: formData?.publisher,
        category: formData?.category,
        managedBy: formData?.managedBy?._id,
      },
      status: formData?.status,
      type: formData?.type,
    };
    try {
      const response: any = await postSoftware(modifiedData);
      enqueueSnackbar(
        response?.data?.message && 'Software Created Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
          autoHideDuration: 1000,
        },
      );
      reset();
      setIsAddDrawerOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.error ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleClose = () => {
    reset();
    setIsAddDrawerOpen(false);
  };
  const submitForm = handleSubmit(submitUpsertSoftwareForm);
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
    isFetching,
    setPageLimit,
    paginationData,
    pageLimit,
    handlePageChange,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    submitForm,
    methods,
    handleClose,
  };
};
