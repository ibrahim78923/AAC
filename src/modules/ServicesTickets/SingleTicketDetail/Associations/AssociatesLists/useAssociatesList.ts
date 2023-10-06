import { useRouter } from 'next/router';
import { associatesListsColumnFunction } from './AssociatesList.data';
import { useTheme } from '@emotion/react';

export const useAssociatesLists = () => {
  const router = useRouter();
  const theme = useTheme();
  const associatesListsColumn = associatesListsColumnFunction(theme, router);
  return {
    associatesListsColumn,
    router,
    theme,
  };
};
