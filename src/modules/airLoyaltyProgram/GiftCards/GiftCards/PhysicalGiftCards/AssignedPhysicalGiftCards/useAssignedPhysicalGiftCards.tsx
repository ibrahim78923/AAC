import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  data,
  assignedPhysicalGiftCardColumnsFunction,
} from './AssignedPhysicalGiftCards.data';

export const useAssignedPhysicalGiftCards = () => {
  const [assignedPhysicalGiftCardData, setAssignedPhysicalGiftCardData] =
    useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const assignedPhysicalGiftCardColumns =
    assignedPhysicalGiftCardColumnsFunction(
      router,
      assignedPhysicalGiftCardData,
      setAssignedPhysicalGiftCardData,
      data,
    );

  return {
    router,
    assignedPhysicalGiftCardColumns,
    data,
    search,
    setSearch,
  };
};
