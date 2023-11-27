import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
const useCompaigns = () => {
  const theme = useTheme();
  const [tabVal, setTabVal] = useState<number>(0);
  const [checkedRows, setCheckedRows] = useState<any>();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedActionsValue, setSelectedOptionsValue] = useState('');

  const [actionsModalDetails, setActionsModalDetails] = useState({
    isClone: false,
    isOpenFilterDrawer: false,
    isExportCompaign: false,
    isEditCompaign: false,
  });
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleSelectedOptionValue = (option: any) => {
    switch (option) {
      case 'Delete':
        setIsDelete(true);
        break;
      case 'Clone':
        setActionsModalDetails({ ...actionsModalDetails, isClone: true });
        break;
      case 'Edit Goal':
        setActionsModalDetails({
          ...actionsModalDetails,
          isOpenFilterDrawer: true,
        });
        break;
      case 'Export Compaign':
        setActionsModalDetails({
          ...actionsModalDetails,
          isExportCompaign: true,
        });
        break;
      case 'Edit Compaign':
        setActionsModalDetails({
          ...actionsModalDetails,
          isEditCompaign: true,
        });
        break;
      case 'View Performance':
        router.push(`${AIR_MARKETER?.VIEW_PERFORMANCE}`);
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
  };
};
export default useCompaigns;
