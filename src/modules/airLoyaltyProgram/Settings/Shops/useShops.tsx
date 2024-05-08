import { useLazyGetShopListQuery } from '@/services/airLoyaltyProgram/settings/shops';
import { useEffect, useState } from 'react';
import SingleShopDetail from './SingleShopDetail';
import UpsertShop from './UpsertShop';
import { DeleteShop } from './DeleteShop';
import { PAGINATION } from '@/config';

export const useShops = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [selectedShopsList, setSelectedShopsList] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetShopListTrigger, lazyGetShopListStatus]: any =
    useLazyGetShopListQuery?.();

  const getShopLists = async (currentPage = page) => {
    const queryParams = {
      search,
      limit: pageLimit,
      page: currentPage,
    };

    const apiDataParameter = { queryParams };

    try {
      await lazyGetShopListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getShopLists?.();
  }, [search, page, pageLimit]);

  const selectAllShops = () => {
    setSelectedShopsList(
      selectedShopsList?.length ===
        lazyGetShopListStatus?.data?.data?.shops?.length
        ? []
        : lazyGetShopListStatus?.data?.data?.shops,
    );
  };

  const toggleShopSelection = (e: any, data: any) => {
    e?.target?.checked
      ? setSelectedShopsList([...selectedShopsList, data])
      : setSelectedShopsList(
          selectedShopsList?.filter((item: any) => item?._id !== data?._id),
        );
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isDetail) {
      return (
        <SingleShopDetail
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          selectedShopsList={selectedShopsList}
          setSelectedShopsList={setSelectedShopsList}
        />
      );
    }
    if (isPortalOpen?.isUpsert) {
      return (
        <UpsertShop
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          getShopLists={getShopLists}
        />
      );
    }
    if (isPortalOpen?.isDelete) {
      return (
        <DeleteShop
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          selectedShopsList={selectedShopsList}
          setSelectedShopsList={setSelectedShopsList}
          getShopLists={getShopLists}
          setPage={setPage}
          page={page}
          totalRecords={lazyGetShopListStatus?.data?.data?.shops?.length}
        />
      );
    }
    return <></>;
  };
  return {
    search,
    setSearch,
    selectedShopsList,
    setSelectedShopsList,
    lazyGetShopListStatus,
    isPortalOpen,
    setIsPortalOpen,
    renderPortalComponent,
    selectAllShops,
    toggleShopSelection,
    setPageLimit,
    setPage,
  };
};
