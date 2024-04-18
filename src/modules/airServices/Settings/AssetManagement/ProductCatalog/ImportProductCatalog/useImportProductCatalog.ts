import { IMPORT_ACTION_TYPE } from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { useImportFileMutation } from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { makePath } = usePath();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const setDrawerDefaultState = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
      }),
    );
    setIsDrawerOpen?.(false);
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        companyAccountId: apiData?.companyAccountId,
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return { setDrawerDefaultState, submitImport, importFileStatus };
};
