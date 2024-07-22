import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAssetsSoftwareQuery } from '@/services/airServices/assets/software';
import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';

export const useSoftware = () => {
  const router = useRouter();
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFilterValues] = useState({});
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState<boolean>(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const apiDataParameter = {
    page,
    limit: pageLimit,
    ...filterValues,
    search: searchValue,
  };

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetAssetsSoftwareQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
    });

  const assetsSoftwares = data?.data?.assetssoftwares;
  const paginationData = data?.data?.meta;

  return {
    router,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    assetsSoftwares,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    softwareData,
    setSoftwareData,
    openAssignModal,
    setOpenAssignModal,
    searchValue,
    setSearchValue,
    setPage,
    setPageLimit,
    paginationData,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    filterValues,
    theme,
  };
};
