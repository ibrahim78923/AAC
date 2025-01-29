import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { responsesListActionsDynamic } from './ResponsesList.data';
import { CANNED_RESPONSES } from '@/constants/strings';
import { convertCurrentCaseToTitleCase } from '@/utils/api';

export const useResponsesList = () => {
  const router = useRouter();

  const [selectedData, setSelectedData] = useState([]);

  const [isPortalOpen, setIsPortalOpen] = useState({
    isOpen: false,
    action: '',
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [search, setSearch] = useState<any>('');

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const setPortalAction = (action: string) => {
    setIsPortalOpen({ isOpen: true, action });
  };

  const openAddResponsePortal = () => {
    setSelectedData([]);
    setPortalAction(CANNED_RESPONSES?.EDIT);
  };

  const responsesListActions = responsesListActionsDynamic(
    setPortalAction,
    selectedData,
  );

  const folderName = convertCurrentCaseToTitleCase(router?.query?.response);

  return {
    setSelectedData,
    setPage,
    page,
    selectedData,
    folderName,
    router,
    handleSearch,
    isPortalOpen,
    setIsPortalOpen,
    responsesListActions,
    openAddResponsePortal,
    search,
  };
};
