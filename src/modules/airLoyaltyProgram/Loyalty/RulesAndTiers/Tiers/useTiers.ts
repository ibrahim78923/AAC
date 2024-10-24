import { PAGINATION } from '@/config';
import { useAppDispatch } from '@/redux/store';
import { setSearch } from '@/redux/slices/airLoyaltyProgram/tiers/slice';

export const useTiers = () => {
  const dispatch = useAppDispatch();

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: newSearch,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  return {
    handleSetSearch,
  };
};
