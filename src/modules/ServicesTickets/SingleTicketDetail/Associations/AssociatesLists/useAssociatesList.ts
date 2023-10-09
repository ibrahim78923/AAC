import { useRouter } from 'next/router';
import {
  associatesListsColumnFunction,
  associatesListsData,
} from './AssociatesList.data';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

export const useAssociatesLists = () => {
  const router = useRouter();
  const theme = useTheme();
  const [associatesData, setAssociatesData] = useState([]);
  const associatesListsColumn = associatesListsColumnFunction(
    theme,
    router,
    associatesData,
    setAssociatesData,
    associatesListsData,
  );
  return {
    associatesListsColumn,
    router,
    theme,
  };
};
