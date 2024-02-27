import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAssetsSoftwareQuery } from '@/services/airServices/assets/software';

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
  };
};
