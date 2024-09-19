import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useDeleteCampaignsMutation,
  useGetCampaignsQuery,
  useGetCampaignsSaveViewQuery,
  usePostCampaignsCloneMutation,
  usePostCampaignsMutation,
  usePostCampaignsSaveViewMutation,
  useUpdateCampaignsMutation,
} from '@/services/airMarketer/campaigns';
import { PAGINATION } from '@/config';
import {
  useGetUsersListQuery,
  useLazyGetUsersListDropdownQuery,
} from '@/services/airSales/deals';
import { ROLES } from '@/constants/strings';
import { getActiveProductSession, getSession } from '@/utils';
import dayjs from 'dayjs';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import { compareInitialVals } from '../Compaigns.data';

const useManage = () => {
  const theme = useTheme();
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
  const activeProduct = getActiveProductSession();
  const companyAccountId =
    activeProduct?.accounts[indexNumbers?.ZERO]?.company?._id;

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [actionsModalDetails, setActionsModalDetails] = useState({
    isClone: false,
    isOpenFilterDrawer: false,
    isExportCompaign: false,
    isEditCompaign: false,
    isEditColumns: false,
    isViewDeatsils: false,
    isSaveView: false,
    isDelete: false,
    isCreateTask: false,
  });

  const [searchCampaigns, setSearchCampaigns] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [checkedColumns, setcheckedColumns] = useState<any>(null);
  const [rowId, setRowId] = useState('');

  const [filters, setFilters] = useState<any>({
    campaignOwner: null,
    campaignStatus: '',
  });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const userListData = useLazyGetUsersListDropdownQuery();

  const compareMethods = useForm<any>({
    defaultValues: compareInitialVals,
  });

  const { data: campaignsData, isLoading: filterLoading } =
    useGetCampaignsQuery({
      page: page,
      limit: pageLimit,
      companyId: companyAccountId,
      search: searchCampaigns ? searchCampaigns : undefined,
      campaignOwner: filters?.campaignOwner
        ? filters?.campaignOwner?._id
        : undefined,
      startDate: filters?.startDate
        ? dayjs(filters?.startDate)?.format(DATE_FORMAT?.API)
        : undefined,
      endDate: filters?.endDate
        ? dayjs(filters?.endDate)?.format(DATE_FORMAT?.API)
        : undefined,
      campaignStatus: filters?.campaignStatus
        ? filters?.campaignStatus
        : undefined,
    });

  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });
  const [postCampaigns, { isLoading: createCampaignsLoading }] =
    usePostCampaignsMutation();

  const [deleteCampaigns, { isLoading: deleteCampaignsLoading }] =
    useDeleteCampaignsMutation();

  const [postCampaignsClone, { isLoading: postCampaignsCloneLoading }] =
    usePostCampaignsCloneMutation();

  const [updateCampaigns, { isLoading: updateCampaignLoading }] =
    useUpdateCampaignsMutation();

  const [postCampaignsSaveView, { isLoading: postCampaignsSaveViewLoading }] =
    usePostCampaignsSaveViewMutation();

  const { data: saveViewCampaignsData } = useGetCampaignsSaveViewQuery();

  const handleResetFilters = () => {
    setFilters({
      campaignOwner: '',
      campaignStatus: '',
    });
  };

  const handleSaveView = () => {
    setActionsModalDetails({ ...actionsModalDetails, isSaveView: true });
  };

  const handleOpenFilter = () => {
    setIsOpenFilter(true);
  };

  return {
    theme,
    actionsModalDetails,
    setActionsModalDetails,
    isOpenFilter,
    setIsOpenFilter,
    handleSaveView,
    handleOpenFilter,
    campaignsData,
    postCampaigns,
    createCampaignsLoading,
    setSearchCampaigns,
    searchCampaigns,
    handleResetFilters,
    filterLoading,
    deleteCampaignsLoading,
    UserListData,
    updateCampaigns,
    postCampaignsCloneLoading,
    postCampaignsClone,
    deleteCampaigns,
    postCampaignsSaveView,
    postCampaignsSaveViewLoading,
    saveViewCampaignsData,
    filters,
    setFilters,
    setPageLimit,
    setPage,
    isActionsDisabled,
    setIsActionsDisabled,
    checkedColumns,
    setcheckedColumns,
    updateCampaignLoading,
    organizationId,
    compareMethods,
    userListData,
    setRowId,
    rowId,
    user,
    selectedRows,
    setSelectedRows,
  };
};
export default useManage;
