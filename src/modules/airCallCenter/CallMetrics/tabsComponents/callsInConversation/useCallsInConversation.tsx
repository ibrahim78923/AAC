import { useState } from 'react';
import { callInConversationColumns } from './callsinConversation.data';

export const useCallsInConversation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const getColumns = callInConversationColumns({});
  return {
    searchTerm,
    setSearchTerm,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
  };
};
