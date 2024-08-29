import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { useLazyGetDashboardNameListDropdownListForDashboardQuery } from '@/services/airServices/dashboard';
import { AIR_SERVICES } from '@/constants';
import { dashboardDropdownActionsDynamic } from './Dashboard.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { htmlToPdfConvert, htmlToPngConvert } from '@/utils/file';
import { useTheme } from '@mui/material';
import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const useDashboard = () => {
  const [dashboardId, setDashboardId] = useState(null);
  const [apiLoader, setApiLoader] = useState<any>({});
  const theme = useTheme();
  const downloadRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState({});

  const downloadReport = async (isPng?: any) => {
    setIsDownloading({ isLoading: true, isPng });
    try {
      isPng === DOWNLOAD_FILE_TYPE?.PNG
        ? await htmlToPngConvert?.(
            downloadRef,
            theme?.palette?.common?.white,
            apiLoader?.data?.data?.dashboard?.name,
          )
        : await htmlToPdfConvert?.(
            downloadRef,
            apiLoader?.data?.data?.dashboard?.name,
            20,
          );
    } catch (error) {}
    setIsDownloading({});
  };

  const router = useRouter();
  const { user }: any = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const emailToCopy = `${window?.location?.origin}${AIR_SERVICES?.DASHBOARD}${
    !!apiLoader?.data?.data?.dashboard?._id
      ? `?dashboardId=${apiLoader?.data?.data?.dashboard?._id}`
      : ''
  }`;

  const copyEmail = () => {
    if (apiLoader?.isError) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    if (!apiLoader?.data?.data?.dashboard?._id) {
      errorSnackbar('Dashboard link not found.');
      return;
    }
    navigator?.clipboard?.writeText(emailToCopy);
    successSnackbar('Link has been copied successfully.');
  };

  const dashboardDropdownActions = dashboardDropdownActionsDynamic(
    setIsDrawerOpen,
    copyEmail,
  );

  const methods = useForm({
    defaultValues: { dashboardId: null },
    resolver: yupResolver(
      Yup?.object()?.shape({
        dashboardId: Yup?.mixed()?.nullable(),
      }),
    ),
  });

  const { control, reset, handleSubmit } = methods;

  const apiQueryDashboardList =
    useLazyGetDashboardNameListDropdownListForDashboardQuery?.();

  const watchDepartment: any = useWatch({
    control,
    name: 'dashboardId',
  });

  const onsubmit = (data: any) => {
    if (router?.query?.dashboardId) {
      router?.push?.(AIR_SERVICES?.DASHBOARD);
    }
    setDashboardId?.(data?.dashboardId);
  };

  useEffect(() => {
    reset({ dashboardId: dashboardId });
  }, [dashboardId, reset]);

  useEffect(() => {
    handleSubmit(onsubmit)();
  }, [watchDepartment?._id]);

  return {
    dashboardId,
    setDashboardId,
    apiLoader,
    setApiLoader,
    dashboardDropdownActions,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    user,
    downloadRef,
    downloadReport,
    isDownloading,
    methods,
    apiQueryDashboardList,
  };
};
