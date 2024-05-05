import { useLazyGetShopListQuery } from '@/services/airLoyaltyProgram/settings/shops';
import { useEffect, useState } from 'react';
import SingleShopDetail from './SingleShopDetail';
import UpsertShop from './UpsertShop';
import { DeleteShop } from './DeleteShop';
import { cardData } from './Shops.data';

export const useShops = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [selectedShopsList, setSelectedShopsList] = useState<any>([]);
  const [search, setSearch] = useState<any>('');

  const [lazyGetShopListTrigger, lazyGetShopListStatus]: any =
    useLazyGetShopListQuery?.();

  const getShopLists = async () => {
    const queryParams = {
      search,
    };
    const apiDataParameter = { queryParams };
    try {
      await lazyGetShopListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getShopLists?.();
  }, [search]);

  const selectAllShops = () => {
    setSelectedShopsList(cardData);
  };

  const toggleShopSelection = (e: any, data: any) => {
    e?.target?.checked
      ? setSelectedShopsList([...selectedShopsList, data])
      : setSelectedShopsList(
          selectedShopsList?.filter((item: any) => item?._id === data?.id),
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
  };
};
