import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { campaignsOptions } from './Campaigns.data';
import {
  useDeleteCampaignsMutation,
  useGetCampaignsSaveViewQuery,
  usePostCampaignsCloneMutation,
  usePostCampaignsSaveViewMutation,
} from '@/services/airMarketer/campaigns';
import { compareInitialVals } from './Compaigns.data';
import {
  useGetUsersListQuery,
  useLazyGetUsersListDropdownQuery,
} from '@/services/airSales/deals';
import { getSession } from '@/utils';
import { DRAWER_TYPES, ROLES } from '@/constants/strings';

const useCampaigns = () => {
  const theme = useTheme();
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
  const [tabVal, setTabVal] = useState<number>(0);
  const [currentTabVal, setCurrentTabVal] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');
  const [isOpenAddAssets, setIsOpenAddAssets] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [actionsModalDetails, setActionsModalDetails] = useState<any>({
    isClone: false,
    isOpenFilterDrawer: false,
    isExportCompaign: false,
    isEditColumns: false,
    isViewDeatsils: false,
    isSaveView: false,
    isDelete: false,
    isCreateTask: false,
  });

  const [createCampaign, setCreateCampaign] = useState({
    isToggle: false,
    type: '',
    recId: [],
  });

  const [isCompare, setIsCompare] = useState(false);
  const [isResetTaskFilter, setIsResetTaskFilter] = useState<boolean>(false);
  const userListData = useLazyGetUsersListDropdownQuery();

  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });

  // collapse menu task filters start here
  const [isFilters, setIsFilters] = useState(false);
  const [taskFilters, setTaskFilters] = useState({
    campaignId: '',
    assignedTo: '',
    status: '',
    taskType: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setSelectedRows([]);
  }, [currentTabVal]);

  const resetTasksFilters = () => {
    setTaskFilters({
      campaignId: '',
      assignedTo: '',
      status: '',
      taskType: '',
      startDate: '',
      endDate: '',
    });
  };

  const compareMethods = useForm<any>({
    defaultValues: compareInitialVals,
  });

  const [deleteCampaigns, { isLoading: deleteCampaignsLoading }] =
    useDeleteCampaignsMutation();

  const [postCampaignsClone, { isLoading: postCampaignsCloneLoading }] =
    usePostCampaignsCloneMutation();

  const [postCampaignsSaveView, { isLoading: postCampaignsSaveViewLoading }] =
    usePostCampaignsSaveViewMutation();

  const { data: saveViewCampaignsData } = useGetCampaignsSaveViewQuery();

  const router = useRouter();
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleCloseAddAssetsModal = () => {
    setIsOpenAddAssets(false);
  };

  const handleSaveView = () => {
    setActionsModalDetails({ ...actionsModalDetails, isSaveView: true });
  };

  const handleSelectedOptionValue = (option: any, selectedValue?: any) => {
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
          isCreateCampaign: {
            isToggle: true,
            type: DRAWER_TYPES?.EDIT,
            recId: selectedValue,
          },
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
          isCreateCampaign: {
            isToggle: true,
            type: DRAWER_TYPES?.CREATE,
            recId: [],
          },
        });
        break;
      default:
        break;
    }
    setSelectedOptionsValue(option);
    setSelectedValue(null);
  };

  return {
    theme,
    tabVal,
    setTabVal,
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    selectedActionsValue,
    actionsModalDetails,
    setActionsModalDetails,
    isCompare,
    setIsCompare,
    isOpenAddAssets,
    setIsOpenAddAssets,
    handleSaveView,
    handleCloseAddAssetsModal,
    isResetTaskFilter,
    setIsResetTaskFilter,
    deleteCampaignsLoading,
    postCampaignsCloneLoading,
    postCampaignsClone,
    deleteCampaigns,
    postCampaignsSaveView,
    postCampaignsSaveViewLoading,
    saveViewCampaignsData,
    resetTasksFilters,
    setCurrentTabVal,
    compareMethods,
    setTaskFilters,
    currentTabVal,
    setIsFilters,
    taskFilters,
    isFilters,
    UserListData,
    userListData,
    organizationId,
    createCampaign,
    setCreateCampaign,
    selectedRows,
    setSelectedRows,
  };
};
export default useCampaigns;
