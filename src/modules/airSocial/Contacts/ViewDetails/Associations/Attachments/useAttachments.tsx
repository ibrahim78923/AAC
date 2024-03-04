import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';

const useAttachments = (contactId: any) => {
  // Get Association Tickets
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  // const defaultParams = {
  //   page: PAGINATION?.CURRENT_PAGE,
  //   limit: PAGINATION?.PAGE_LIMIT,
  // };
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams] = useState({
    page: page,
    limit: pageLimit,
    contactId: contactId,
    association_type: 'attachments',
  });
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetDeals, isLoading: loadingDeals } =
    useGetContactAssociationsQuery({
      params: { ...filterParams, ...searchPayLoad },
    });

  // Drawer Edit
  const methodsAttachments = useForm({
    // resolver: yupResolver(productsValidationSchema),
    // defaultValues: productsDefaultValues
  });
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [isDisabledFields, setIsDisabledFields] = useState(true);
  const handleOpenDrawer = (title: any, data: any) => {
    setDrawerTitle(title);

    if (data) {
      methodsAttachments.setValue('name', data?.name);
      methodsAttachments.setValue('dealPiplineId', data?.dealPiplineId);
      methodsAttachments.setValue('dealStageId', data?.dealStageId);
      methodsAttachments.setValue('amount', data?.amount);
      methodsAttachments.setValue('closeDate', new Date(data?.closeDate));
      methodsAttachments.setValue('ownerId', data?.ownerId);
      methodsAttachments.setValue('priority', data?.priority);
      methodsAttachments.setValue('addLineItemId', data?.addLineItemId);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const theme = useTheme();

  return {
    setPage,
    setPageLimit,
    searchValue,
    setSearchValue,
    loadingDeals,
    dataGetDeals,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsAttachments,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,

    theme,
  };
};

export default useAttachments;
