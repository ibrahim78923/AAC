import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useGetKnowledgeBaseFolderQuery } from '@/services/airCustomerPortal/KnowledgeBase';

export const useKnowledgeBase = () => {
  const router = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [search, setSearch] = useState('');

  const handleKnowledgeBaseDetail = (folderId: any, folderName: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
      query: { folderId, folderName },
    });
  };

  const handleButtonClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const apiDataParameter = {
    queryParams: {
      search,
    },
  };
  const { data, isLoading, isFetching, isError } =
    useGetKnowledgeBaseFolderQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
    });
  const KnowledgeBaseFolderData = data?.data;

  return {
    handleKnowledgeBaseDetail,
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    KnowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
  };
};
