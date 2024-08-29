import {
  FIELD_TYPES,
  IMPORT_FILE_TYPE,
  IMPORT_OBJECT_TYPE,
  IMPORT_PRODUCTS_NAME,
  IMPORT_TABLE_NAMES,
} from '@/constants/strings';
import { useNewImportFileForServicesMutation } from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { CRM_COLUMNS_VENDOR } from './ImportVendor.data';
import { IVendorProps } from '../Vendor.interface';

export const useImportVendor = (props: IVendorProps) => {
  const { setIsDrawerOpen } = props;

  const [newImportFileForServicesTrigger, newImportFileForServicesStatus] =
    useNewImportFileForServicesMutation?.();

  const setDrawerDefaultState = () => {
    setIsDrawerOpen?.(false);
  };

  const filterMandatoryFields = () => {
    return CRM_COLUMNS_VENDOR?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.fileUrl,
        tableName: IMPORT_TABLE_NAMES?.VENDORS,
        object: IMPORT_OBJECT_TYPE?.SETTINGS,
        product: IMPORT_PRODUCTS_NAME?.AIR_SERVICES,
        fileType: IMPORT_FILE_TYPE?.CSV,
        dataColumn: apiData?.dataColumn,
      },
    };

    try {
      const response: any =
        await newImportFileForServicesTrigger?.(apiImportData)?.unwrap();
      successSnackbar(response?.message);
      apiData?.onClose?.();
      apiData?.setShowItemsList(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    setDrawerDefaultState,
    submitImport,
    newImportFileForServicesStatus,
    filterMandatoryFields,
  };
};
