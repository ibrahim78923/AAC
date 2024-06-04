import { useTheme } from '@mui/material';
import { useState } from 'react';
import { singleCallDetailsColumns } from './singleAllCallsDetails.data';
import { useRouter } from 'next/router';

const useSingleAllCallsDetails = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState();
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const getColumns = singleCallDetailsColumns({ setIsViewDrawerOpen });
  const router = useRouter();
  return {
    theme,
    searchTerm,
    setSearchTerm,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    router,
  };
};

export default useSingleAllCallsDetails;
