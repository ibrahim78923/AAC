import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useImportFileMutation } from '@/services/airServices/global/import';
import { CRM_COLUMNS } from './ImportDealsDrawer.data';
import { FIELD_TYPES } from '@/constants/strings';

const useImportDeal = (setIsImportDeal: any) => {
  const theme: any = useTheme();
  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const setDrawerDefaultState = () => {
    setIsImportDeal?.(false);
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.filePath,
        actionType: 'COMPANIES',
        dataColumn: apiData?.dataColumn,
      },
    };
    try {
      const response: any = await importFileTrigger?.(apiImportData)?.unwrap();
      successSnackbar(response?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const filterMandatoryFields = () => {
    return CRM_COLUMNS?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  return {
    theme,
    setDrawerDefaultState,
    submitImport,
    filterMandatoryFields,
    importFileStatus,
  };
};

export default useImportDeal;
