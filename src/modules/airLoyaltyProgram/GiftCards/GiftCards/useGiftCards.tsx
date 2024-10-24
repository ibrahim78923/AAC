import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { giftCardColumnsFunction } from './GiftCards.data';
import { AddGiftCards } from './AddGiftCards';
import { GiftCardFilter } from './GiftCardsFilter';
import { PAGINATION } from '@/config';
import { buildQueryParams } from '@/utils/api';
import { useLazyGetGiftCardListQuery } from '@/services/airLoyaltyProgram/giftCards/giftCards';

export const useGiftCards = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCard, setFilterGiftCard] = useState({});
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();
  const [lazyGetGiftCardListTrigger, lazyGetGiftCardListStatus]: any =
    useLazyGetGiftCardListQuery();

  const getGiftCardList = async () => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterGiftCard,
    );
    const apiDataParameter = { queryParams: getGiftCardParam };
    try {
      await lazyGetGiftCardListTrigger(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  useEffect(() => {
    getGiftCardList?.();
  }, [page, pageLimit, search, filterGiftCard]);

  const giftCardColumns = giftCardColumnsFunction(router);

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return (
        <GiftCardFilter
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          filterGiftCard={filterGiftCard}
          setFilterGiftCard={setFilterGiftCard}
        />
      );
    }
    if (isPortalOpen?.isAdd) {
      return (
        <AddGiftCards
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      );
    }
    return <></>;
  };

  return {
    giftCardColumns,
    handleSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetGiftCardListStatus,
    setPage,
    setPageLimit,
  };
};
