import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useLazyGetInstallationByIdQuery } from '@/services/airServices/assets/software/single-software-detail/installations';
import { installDevicesListColumnDynamic } from './InstallDevicesList.data';
import { DevicesListPropsI } from '../Installations.interface';
import { useRouter } from 'next/router';

export const useInstallDevicesList = (props: DevicesListPropsI) => {
  const { search, page, selectedDeviceList, setSelectedDeviceList } = props;

  const router = useRouter();
  const deviceId = router?.query?.softwareId;
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const [
    lazyGetInstallationTrigger,
    { data: installationsData, isLoading, isError, isFetching, isSuccess },
  ] = useLazyGetInstallationByIdQuery();

  const getInstallationListData = async (currentPage = page) => {
    const getInstallationParam = new URLSearchParams();
    getInstallationParam?.append('page', currentPage + '');
    getInstallationParam?.append('limit', pageLimit + '');
    getInstallationParam?.append('deviceId', deviceId + '');
    getInstallationParam?.append('search', search + '');
    try {
      await lazyGetInstallationTrigger(getInstallationParam)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getInstallationListData();
  }, [page, pageLimit, search]);

  const installationData = installationsData?.data?.inventories;

  const metaData = installationsData?.data?.meta;

  const installDevicesListColumn = installDevicesListColumnDynamic(
    installationData,
    selectedDeviceList,
    setSelectedDeviceList,
  );

  return {
    pageLimit,
    setPageLimit,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    metaData,
    installationData,
    getInstallationListData,
    installDevicesListColumn,
  };
};
