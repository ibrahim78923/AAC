import { PAGINATION } from '@/config';
import { ARRAY_INDEX } from '@/constants/strings';
import { useGetAllEmailsCompaniesQuery } from '@/services/commonFeatures/companies';
import { useGetGmailMessageDetailsQuery } from '@/services/commonFeatures/email/gmail';
import { isNullOrEmpty } from '@/utils';
import { useState } from 'react';

const useEmails = (companyId: any) => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { threadId: number }[]
  >([]);

  const params = {
    page: page,
    limit: pageLimit,
    companyIds: companyId,
  };
  const {
    data: EmailListData,
    isLoading: EmailListIsLoading,
    isFetching: EmailListIsFetching,
  } = useGetAllEmailsCompaniesQuery({
    ...params,
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any,
  ) => {
    const isChecked = event?.target?.checked;

    setSelectedCheckboxes((prevSelected: any) =>
      isChecked
        ? [...prevSelected, id]
        : prevSelected?.filter((itemId: any) => itemId?._id !== id?._id),
    );
  };

  const {
    data: messageDetailsData,
    isLoading: isLoadingDetailsMessages,
    isFetching: isFetchingDetailsMessages,
  } = useGetGmailMessageDetailsQuery(
    {
      params: {
        threadId: selectedCheckboxes[ARRAY_INDEX?.ZERO]?.threadId,
      },
    },
    {
      skip: isNullOrEmpty(selectedCheckboxes) || selectedCheckboxes?.length > 1,
    },
  );

  return {
    openDrawer,
    setOpenDrawer,
    handleCheckboxChange,
    selectedCheckboxes,
    setSelectedCheckboxes,
    EmailListData,
    EmailListIsLoading,
    EmailListIsFetching,
    messageDetailsData,
    isLoadingDetailsMessages,
    isFetchingDetailsMessages,
    setPageLimit,
    setPage,
  };
};

export default useEmails;
