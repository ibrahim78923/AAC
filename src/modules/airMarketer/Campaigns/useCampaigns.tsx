import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { campaignsOptions } from './Campaigns.data';
import {
  useDeleteCampaignsMutation,
  useGetCampaignsByIdQuery,
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
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { getSession } from '@/utils';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { initvalues, validationSchema } from './Compaigns.data';
import { enqueueSnackbar } from 'notistack';

const useCampaigns = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState<number>(0);
  const [currentTabVal, setCurrentTabVal] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
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
  const [campaignDataById, setCampaignDataById] = useState<any>({});
  const [isDelete, setIsDelete] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [isResetTaskFilter, setIsResetTaskFilter] = useState<boolean>(false);
  const [searchCampaigns, setSearchCampaigns] = useState('');
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const campaignId = useSearchParams()?.get('id');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [checkedColumns, setcheckedColumns] = useState<any>(null);
  const [rowId, setRowId] = useState(null);

  // collapse menu task filters start here

  const [isFilters, setIsFilters] = useState(false);
  const [taskFilters, setTaskFilters] = useState({
    campaignId: '',
  });

  const resetTasksFilters = () => {
    setTaskFilters({
      campaignId: '',
    });
  };

  // collapse menu task filters ends here

  const [filters, setFilters] = useState<any>({
    campaignOwner: null,
    campaignStatus: '',
  });

  const userListData = useLazyGetUsersListDropdownQuery();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: initvalues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    const campaignBudget = values?.campaignBudget
      ? parseFloat(values?.campaignBudget)
      : null;

    const startDate = values?.startDate
      ? dayjs(values?.startDate[0])?.format(DATE_FORMAT?.API)
      : undefined;
    const endDate = values?.endDate
      ? dayjs(values?.endDate[0])?.format(DATE_FORMAT?.API)
      : undefined;

    const obj = {
      ...values,
      campaignBudget,
      startDate,
      endDate,
      campaignOwner: values?.campaignOwner?._id,
    };

    const filteredObj: { [key: string]: any } = Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          acc[key] = obj[key];
        }
        return acc;
      },
      {},
    );

    try {
      await postCampaigns({ body: filteredObj })?.unwrap();
      enqueueSnackbar('Campaigns created successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Error while creating campaigns', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    reset();
    setIsCreateTask(false);
  };

  const { data: campaignsData, isLoading: filterLoading } =
    useGetCampaignsQuery({
      page: page,
      limit: pageLimit,
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

  const { data: campaignsById, isLoading: campaignsLoadingById } =
    useGetCampaignsByIdQuery(campaignId);
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
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

  const CampaignTask: any = useForm({});
  const router = useRouter();
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };
  const handleResetFilters = () => {
    setFilters({
      campaignOwner: '',
      campaignStatus: '',
    });
  };
  const handleCloseAddAssetsModal = () => {
    setIsOpenAddAssets(false);
  };
  const handleSaveView = () => {
    setActionsModalDetails({ ...actionsModalDetails, isSaveView: true });
  };
  const handleOpenFilter = () => {
    setIsOpenFilter(true);
  };
  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case campaignsOptions?.DELETE:
        setActionsModalDetails({ ...actionsModalDetails, isDelete: true });
        break;
      case campaignsOptions?.CLONE:
        setActionsModalDetails({ ...actionsModalDetails, isClone: true });
        break;
      case campaignsOptions?.EDIT_GOAL:
        setActionsModalDetails({
          ...actionsModalDetails,
          isOpenFilterDrawer: true,
        });
        break;
      case campaignsOptions?.EXPORT_CAMPAIGN:
        setActionsModalDetails({
          ...actionsModalDetails,
          isExportCompaign: true,
        });
        break;
      case campaignsOptions?.EDIT_CAMPAIGN:
        setActionsModalDetails({
          ...actionsModalDetails,
          isEditCompaign: true,
        });
        break;
      case campaignsOptions?.VIEW_PERFORMANCE:
        router.push(`${AIR_MARKETER?.VIEW_PERFORMANCE}`);
        break;
      case campaignsOptions?.EDIT_COLUMNS:
        setActionsModalDetails({
          ...actionsModalDetails,
          isEditColumns: true,
        });
        break;
      case campaignsOptions?.VIEW_DETAILS:
        setActionsModalDetails({
          ...actionsModalDetails,
          isViewDeatsils: true,
        });
        break;
      case campaignsOptions?.CREATE_TASK:
        setActionsModalDetails({
          ...actionsModalDetails,
          isCreateTask: true,
        });
        break;
      default:
        break;
    }

    setSelectedOptionsValue(option);
    setSelectedValue(null);
  };
  const allCamopaignsData = campaignsData?.data?.campaigns;
  const handleSelectAllCheckbox = (checked: any) => {
    setSelectedRows(
      checked ? allCamopaignsData?.map((obj: { _id: string }) => obj?._id) : [],
    );
  };
  const handleSelectSingleCheckBox = (value: any, id: string) => {
    if (value?.target?.checked) setSelectedRows([...selectedRows, id]);
    else setSelectedRows(selectedRows?.filter((row: any) => row !== id));
  };

  return {
    theme,
    tabVal,
    setTabVal,
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    selectedActionsValue,
    isDelete,
    setIsDelete,
    actionsModalDetails,
    setActionsModalDetails,
    isCreateTask,
    setIsCreateTask,
    CampaignTask,
    isCompare,
    setIsCompare,
    isOpenFilter,
    isOpenAddAssets,
    setIsOpenFilter,
    setIsOpenAddAssets,
    handleSaveView,
    handleCloseAddAssetsModal,
    handleOpenFilter,
    searchVal,
    setSearchVal,
    isResetTaskFilter,
    setIsResetTaskFilter,
    campaignsData,
    postCampaigns,
    createCampaignsLoading,
    setSearchCampaigns,
    searchCampaigns,
    handleResetFilters,
    filterLoading,
    handleSelectSingleCheckBox,
    handleSelectAllCheckbox,
    selectedRows,
    allCamopaignsData,
    deleteCampaignsLoading,
    campaignDataById,
    setCampaignDataById,
    UserListData,
    updateCampaigns,
    campaignsById,
    postCampaignsCloneLoading,
    postCampaignsClone,
    deleteCampaigns,
    setSelectedRows,
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
    campaignsLoadingById,
    resetTasksFilters,
    setCurrentTabVal,
    organizationId,
    setTaskFilters,
    currentTabVal,
    setIsFilters,
    userListData,
    handleSubmit,
    taskFilters,
    isFilters,
    setRowId,
    onSubmit,
    methods,
    rowId,
    user,
  };
};
export default useCampaigns;
