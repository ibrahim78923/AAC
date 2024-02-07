import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { campaignsOptions } from './Campaigns.data';

const useCampaigns = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState<number>(0);
  const [checkedRows, setCheckedRows] = useState<any>();
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
  const [isDelete, setIsDelete] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const CampaignTask: any = useForm({});
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

  return {
    theme,
    tabVal,
    setTabVal,
    checkedRows,
    setCheckedRows,
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
  };
};
export default useCampaigns;
