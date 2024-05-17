import {
  FIELD_TYPES,
  IMPORT_FILE_TYPE,
  IMPORT_OBJECT_TYPE,
  IMPORT_PRODUCTS_NAME,
  IMPORT_TABLE_NAMES,
} from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { useNewImportFileForServicesMutation } from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { CRM_COLUMNS } from './ImportProductCatalog.data';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();

  const [newImportFileForServicesTrigger, newImportFileForServicesStatus] =
    useNewImportFileForServicesMutation?.();

  const setDrawerDefaultState = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  const filterMandatoryFields = () => {
    return CRM_COLUMNS?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.fileUrl,
        tableName: IMPORT_TABLE_NAMES?.PRODUCT_CATALOG,
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
