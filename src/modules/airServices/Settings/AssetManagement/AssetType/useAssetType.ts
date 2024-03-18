import { PAGINATION } from '@/config';
import { useGetAssetTypeQuery } from '@/services/airServices/settings/asset-management/asset-type';
import { useState } from 'react';

export const useAssetType = () => {
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const [subChildCollapseItem, setSubChildCollapseItem] = useState<
    undefined | number
  >();
  const [selectedId, setSelectedId] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
    setSubChildCollapseItem(undefined);
  };

  const handleSubChildCollapse = (item: number) => {
    setSubChildCollapseItem(subChildCollapseItem !== item ? item : undefined);
  };

  const param = {
    page: page,
    limit: pageLimit,
    meta: true,
  };

  const { data, isLoading, isFetching } = useGetAssetTypeQuery(param);
  const assetTypeData = data?.data?.assettypes;
  const metaData = data?.meta;

  return {
    collapseItem,
    handleCollapse,
    subChildCollapseItem,
    handleSubChildCollapse,
    assetTypeData,
    metaData,
    page,
    setPage,
    setPageLimit,
    pageLimit,
    setSelectedId,
    selectedId,
    isLoading,
    isFetching,
  };
};
