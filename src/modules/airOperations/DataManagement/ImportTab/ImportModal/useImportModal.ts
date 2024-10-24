import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  importDefaultValues,
  importValidationSchema,
  productOptionsFunction,
  stepsData,
} from './ImportModal.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useImportFileMutation,
  useLazyGetSignedUrlForImportQuery,
  useNewImportFileForServicesMutation,
  useUploadFileTos3UsingSignedUrlMutation,
} from '@/services/airServices/global/import';
import {
  FIELD_TYPES,
  IMPORT_ACTION_TYPE,
  IMPORT_FILE_TYPE,
  IMPORT_OBJECT_TYPE,
  IMPORT_PRODUCTS_NAME,
  OBJECT_URL_IMPORT,
  PRODUCTS_LISTS,
} from '@/constants/strings';
import { Theme, useTheme } from '@mui/material';
import { useGetAuthAccountsForOperationsReportsQuery } from '@/services/airOperations/reports';

export const useImportModal = () => {
  const [csvFileData, setCsvFileData] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [importLog, setImportLog] = useState('');
  const [fileResponse, setFileResponse] = useState<any>(null);
  const theme: Theme = useTheme();

  const methodsImportModalForm = useForm<any>({
    resolver: yupResolver(importValidationSchema(modalStep)),
    defaultValues: importDefaultValues,
  });

  const { control, handleSubmit, reset, watch, setValue } =
    methodsImportModalForm;
  const importDeals = watch('importDeals');
  const product = watch('product');

  const { fields, remove } = useFieldArray({
    control,
    name: 'importedFields',
  });

  const {
    data: accountsData,
    isLoading,
    isFetching,
  } = useGetAuthAccountsForOperationsReportsQuery?.(
    {},
    { refetchOnMountOrArgChange: true },
  );

  const filterMandatoryFields = () => {
    return stepsData[importLog]?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  const productOptions = useMemo(() => {
    const hasAccounts = accountsData?.data?.map(
      (account: any) =>
        [PRODUCTS_LISTS?.AIR_SALES, PRODUCTS_LISTS?.AIR_SERVICES]?.includes(
          account?.name,
        ) && account?.name,
    );
    return productOptionsFunction(hasAccounts);
  }, [accountsData]);

  const [newImportFileForServicesTrigger, newImportFileForServicesStatus] =
    useNewImportFileForServicesMutation?.();

  const [
    uploadFileTos3UsingSignedUrlTrigger,
    uploadFileTos3UsingSignedUrlStatus,
  ] = useUploadFileTos3UsingSignedUrlMutation?.();

  const [lazyGetSignedUrlForImportTrigger, lazyGetSignedUrlForImportStatus] =
    useLazyGetSignedUrlForImportQuery?.();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const submitImportModalForm = async (data: any) => {
    try {
      if (data?.product === IMPORT_ACTION_TYPE?.SALES) {
        if (modalStep === 1) {
          setModalStep((prev: any) => ++prev);
        } else if (modalStep === 2) {
          const signedUrlApiDataParameter = {
            queryParams: {
              objectUrl: OBJECT_URL_IMPORT?.USERS_ATTACHMENT,
            },
          };

          try {
            const response: any = await lazyGetSignedUrlForImportTrigger?.(
              signedUrlApiDataParameter,
            )?.unwrap();
            const s3Data = {
              file: data?.importDeals,
              signedUrl: response?.data,
            };
            await uploadToS3CsvFile?.(s3Data);
          } catch (error: any) {
            errorSnackbar(error?.data?.message);
          }
          setModalStep((prev: any) => ++prev);
        } else {
          const dataColumn = data?.importedFields?.reduce(
            (acc: any, item: any) => ({
              ...acc,
              [item?.fileColumn]: item?.crmFields?._id,
            }),
            {},
          );

          const values = Object?.values(dataColumn);
          const hasDuplicate = values?.some(
            (value: any, index: any) => values?.indexOf(value) !== index,
          );

          const isRequiredFieldMap: any = values?.reduce(
            (acc: any, curr: any) => ((acc[curr] = true), acc),
            {},
          );

          const isAllRequiredFieldPresent = filterMandatoryFields()?.every(
            (crmColumn: any) => isRequiredFieldMap?.[crmColumn?._id],
          );

          if (hasDuplicate) {
            hasDuplicate &&
              errorSnackbar('Duplicate crmFields are not allowed');
          } else if (!isAllRequiredFieldPresent) {
            !isAllRequiredFieldPresent &&
              errorSnackbar('Select all mandatory field');
          } else {
            const apiData = {
              body: {
                filePath: `${OBJECT_URL_IMPORT?.USERS_ATTACHMENT}/${data?.importDeals?.name}`,
                dataColumn: dataColumn,
                actionType: importLog,
              },
            };
            try {
              const response: any =
                await importFileTrigger?.(apiData)?.unwrap();
              successSnackbar(response?.message);
              handleClose();
              reset();
            } catch (error: any) {
              errorSnackbar(error?.data?.message);
            }
          }
        }
      } else {
        if (modalStep === 1) {
          setModalStep((prev: any) => ++prev);
        } else if (modalStep === 2) {
          const signedUrlApiDataParameter = {
            queryParams: {
              objectUrl: `${OBJECT_URL_IMPORT?.USERS_ATTACHMENT}/${data?.importDeals?.path}`,
            },
          };

          try {
            const response: any = await lazyGetSignedUrlForImportTrigger?.(
              signedUrlApiDataParameter,
            )?.unwrap();
            const s3Data = {
              file: data?.importDeals,
              signedUrl: response?.data,
            };

            await uploadToS3CsvFile(s3Data);
            setFileResponse(response);
          } catch (error: any) {
            errorSnackbar(error?.data?.message);
          }
          setModalStep((prev: any) => ++prev);
        } else {
          const dataColumn = data?.importedFields?.reduce(
            (acc: any, item: any) => ({
              ...acc,
              [item?.fileColumn]: item?.crmFields?._id,
            }),
            {},
          );

          const values = Object?.values(dataColumn);
          const hasDuplicate = values?.some(
            (value: any, index: any) => values?.indexOf(value) !== index,
          );

          const isRequiredFieldMap: any = values?.reduce(
            (acc: any, curr: any) => ((acc[curr] = true), acc),
            {},
          );

          const isAllRequiredFieldPresent = filterMandatoryFields()?.every(
            (crmColumn: any) => isRequiredFieldMap?.[crmColumn?._id],
          );

          if (hasDuplicate) {
            hasDuplicate &&
              errorSnackbar('Duplicate crmFields are not allowed');
          } else if (!isAllRequiredFieldPresent) {
            !isAllRequiredFieldPresent &&
              errorSnackbar('Select all mandatory field');
          } else {
            const url = new URL(`${fileResponse?.data}`);
            const filePath = `${url?.origin}${url?.pathname}`;
            const apiData = {
              body: {
                filePath: filePath,
                tableName: importLog,
                product: IMPORT_PRODUCTS_NAME?.OPERATIONS,
                object:
                  importLog === IMPORT_ACTION_TYPE?.INVENTORIES
                    ? IMPORT_OBJECT_TYPE?.ASSETS
                    : IMPORT_OBJECT_TYPE?.SETTINGS,
                fileType: IMPORT_FILE_TYPE?.CSV,
                dataColumn: dataColumn,
              },
            };

            try {
              const response: any =
                await newImportFileForServicesTrigger?.(apiData)?.unwrap();
              successSnackbar(response?.message);
              handleClose();
              reset();
              setFileResponse(null);
            } catch (error: any) {
              errorSnackbar(error?.data?.message);
            }
          }
        }
      }
    } catch (error: any) {
      errorSnackbar(error?.message);
    }
  };

  const uploadToS3CsvFile = async (data: any) => {
    const s3ApiDataParameter = {
      url: data?.signedUrl,
      body: {
        file: data?.file,
      },
    };
    try {
      await uploadFileTos3UsingSignedUrlTrigger(s3ApiDataParameter)?.unwrap();
      successSnackbar('File Uploaded');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleFileChange = (event: any) => {
    if (event) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (event?.target?.result) {
          const result: string = event?.target?.result?.toString();
          const lines = result?.split('\n');
          const headers = lines[0]?.split(',');
          const uniqueColumns = Array?.from(new Set(headers));
          const data = uniqueColumns?.map((column: any) => ({ column }));
          setCsvFileData(data);
        }
      };
      reader?.readAsText(event);
    }
  };

  const handlePreview = () => {
    if (importDeals) {
      const fileURL = URL?.createObjectURL(importDeals);
      window?.open(fileURL);
    } else {
      errorSnackbar('Please select a file to preview');
    }
  };

  useEffect(() => {
    const importedFiles = csvFileData?.map((item: any) => ({
      fileColumn: item?.column,
      crmFields: null,
    }));
    setValue('importedFields', importedFiles);
  }, [csvFileData]);

  useEffect(() => {
    importDeals && handleFileChange(importDeals);
    !product && (reset(), setImportLog(''));
    !importDeals && modalStep === 1 && setValue('importDeals', null);
  }, [importDeals, product, importLog, modalStep]);

  const handleClose = () => {
    setIsDrawerOpen(false);
    setModalStep(1);
    setImportLog('');
    reset();
  };

  const resetImportModalForm = async () => {
    if (modalStep > 1) {
      setModalStep((prev: any) => --prev);
    } else handleClose();
  };

  const handleSelect = (selectedValue: any) => {
    setImportLog(selectedValue);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsImportModalForm,
    control,
    submitImportModalForm,
    resetImportModalForm,
    isNewImport,
    setIsNewImport,
    modalStep,
    handleClose,
    handleSelect,
    importLog,
    product,
    handleSubmit,
    fields,
    handlePreview,
    remove,
    lazyGetSignedUrlForImportStatus,
    uploadFileTos3UsingSignedUrlStatus,
    importFileStatus,
    newImportFileForServicesStatus,
    theme,
    productOptions,
    isLoading,
    isFetching,
    importDeals,
    filterMandatoryFields,
  };
};
