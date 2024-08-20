import { FIELD_TYPES, IMPORT_ACTION_TYPE } from '@/constants/strings';
import { useImportFileMutation } from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { CRM_COLUMNS_LOCATION } from './ImportLocation.data';
import { IErrorResponse, ILocationProps } from '../Location.interface';

export const useImportLocation = (props: ILocationProps) => {
  const { setIsDrawerOpen } = props;

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const setDrawerDefaultState = () => {
    setIsDrawerOpen?.(false);
  };

  const filterMandatoryFields = () => {
    return CRM_COLUMNS_LOCATION?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.filePath,
        actionType: IMPORT_ACTION_TYPE?.PRODUCT_CATALOG,
        dataColumn: apiData?.dataColumn,
      },
    };
    //TODO: will handle here once import is given by BE just test here the global import
    return;
    try {
      const response: any = await importFileTrigger?.(apiImportData)?.unwrap();
      successSnackbar(response?.message);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  return {
    setDrawerDefaultState,
    submitImport,
    importFileStatus,
    filterMandatoryFields,
  };
};
