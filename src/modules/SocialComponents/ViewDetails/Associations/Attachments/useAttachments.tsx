import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetAttachmentQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';
import { PAGINATION } from '@/config';

const useAttachments = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  // const searchObj = {
  //   search: searchName,
  //    id: companyId?.companyId,
  // };

  const { data: getCompanyAttachment, isLoading } = useGetAttachmentQuery({
    page,
    pageLimit,
    // params: searchObj,
    id: companyId?.companyId,
  });

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    isLoading,
    setPage,
    setPageLimit,
    getCompanyAttachment,
  };
};

export default useAttachments;
