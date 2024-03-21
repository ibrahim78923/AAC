import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { requestersList, requestersDropdown } from './Requesters.data';
import { useRouter } from 'next/router';
import {
  useGetRequestersListQuery,
  useGetViewRequestersDetailsQuery,
} from '@/services/airServices/settings/user-management';
import { PAGINATION } from '@/config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters/UpsertRequesters.data';
import { useSearchParams } from 'next/navigation';
import { ROLES } from '@/constants/strings';

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
    useGetRequestersListQuery(params, {
      refetchOnMountOrArgChange: true,
    });

  const metaData = data?.data?.meta;

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
    data?.data?.users,
  );
  const requestersDropdownOptions = requestersDropdown(
    setDeleteModal,
    setWarningModal,
  );

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
    data,
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
  };
};
