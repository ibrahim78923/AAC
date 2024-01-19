import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { requestersList, requestersDropdown } from './Requesters.data';
import { useRouter } from 'next/router';
import {
  useGetRequestersListQuery,
  useGetViewRequestersDetailsQuery,
  usePatchRequesterMutation,
} from '@/services/airServices/settings/user-management';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters/UpsertRequesters.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { useSearchParams } from 'next/navigation';

export const useRequesters = () => {
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedRequestersList, setSelectedRequestersList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
    role: ROLES?.ORG_REQUESTER,
  };

  const { data, isLoading, isError, isFetching, isSuccess }: any =
    useGetRequestersListQuery(params);

  const tableData = data?.data?.users;

  const metaData = data?.data?.meta;

  const tableListData = tableData?.map(
    (requester: { firstName: any; lastName: any }) => ({
      ...requester,
      fullName: `${requester.firstName} ${requester.lastName}`,
    }),
  );

  const profileId = useSearchParams()?.get('_id');
  const { data: viewRequestersData } = useGetViewRequestersDetailsQuery(
    profileId,
  ) as { data: any };
  const profileData = [viewRequestersData?.data];
  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues(profileData),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(upsertRequestersDefaultValues(profileData));
  }, [viewRequestersData]);

  const requestersListColumn = requestersList(
    selectedRequestersList,
    setSelectedRequestersList,
    theme,
    router,
    tableListData,
  );
  const requestersDropdownOptions = requestersDropdown(
    setDeleteModal,
    setWarningModal,
  );

  const [editRequester] = usePatchRequesterMutation();

  const submit = async (data: any) => {
    const formData = {
      id: profileId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      jobTitle: data?.jobTitle,
      phoneNumber: data?.phoneNumber,
      timezone: data?.timezone,
    };
    try {
      const res: any = await editRequester(formData).unwrap();
      enqueueSnackbar(
        res?.data?.data?.message ?? 'Single Requesters Edit  Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setIsDrawerOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    handleClose?.();
  };
  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };
  return {
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedRequestersList,
    setSelectedRequestersList,
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    requestersDropdownOptions,
    router,
    requestersListColumn,
    tableListData,
    metaData,
    setPage,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    page,
    pageLimit,
    profileData,
    methods,
    handleSubmit,
    submit,
    handleClose,
  };
};
