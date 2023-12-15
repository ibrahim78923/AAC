import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  data,
  notAssignedPhysicalGiftCardColumnsFunction,
} from './NotAssignedPhysicalGiftCards.data';

export const useNotAssignedPhysicalGiftCards = () => {
  const [notAssignedPhysicalGiftCardData, setNotAssignedPhysicalGiftCardData] =
    useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const notAssignedPhysicalGiftCardColumns =
    notAssignedPhysicalGiftCardColumnsFunction(
      router,
      notAssignedPhysicalGiftCardData,
      setNotAssignedPhysicalGiftCardData,
      data,
    );

  return {
    router,
    notAssignedPhysicalGiftCardColumns,
    data,
    setSearch,
    search,
  };
};
