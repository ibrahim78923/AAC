import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  importDefaultValues,
  importValidationSchema,
} from './ImportModal.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useImportFileMutation,
  useLazyGetSignedUrlForImportQuery,
  useUploadFileTos3UsingSignedUrlMutation,
} from '@/services/airServices/global/import';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

export const useImportModal = () => {
  const [csvFileData, setCsvFileData] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [importLog, setImportLog] = useState('');

  const methodsImportModalForm = useForm<any>({
    resolver: yupResolver(importValidationSchema(modalStep)),
    defaultValues: importDefaultValues,
  });

  const product = methodsImportModalForm?.watch()?.product;
  const importDeals = methodsImportModalForm?.watch()?.importDeals;

  const { control, handleSubmit, reset } = methodsImportModalForm;
  const { fields, remove } = useFieldArray({
    control,
    name: 'importedFields',
  });

  const [
    uploadFileTos3UsingSignedUrlTrigger,
    uploadFileTos3UsingSignedUrlStatus,
  ] = useUploadFileTos3UsingSignedUrlMutation?.();

  const [lazyGetSignedUrlForImportTrigger, lazyGetSignedUrlForImportStatus] =
    useLazyGetSignedUrlForImportQuery?.();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const submitImportModalForm = async (data: any) => {
    try {
      if (data?.product === 'Sales') {
        if (modalStep === 1) {
          setModalStep((prev) => ++prev);
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
          setModalStep((prev) => ++prev);
        } else {
          const dataColumn = data?.importedFields?.reduce(
            (acc: any, item: any) => ({
              ...acc,
              [item?.fileColumn]: item?.crmFields,
            }),
            {},
          );
          const apiData = {
            body: {
              filePath: `${OBJECT_URL_IMPORT?.USERS_ATTACHMENT}/${data?.importDeals?.name}`,
              dataColumn: dataColumn,
              actionType: importLog,
            },
          };
          try {
            const response: any = await importFileTrigger?.(apiData)?.unwrap();
            successSnackbar(response?.message);
            handleClose();
            reset();
          } catch (error: any) {
            errorSnackbar(error?.data?.message);
          }
        }
      } else {
        if (modalStep === 1) {
          setModalStep((prev) => ++prev);
        } else if (modalStep === 2) {
          setModalStep((prev) => ++prev);
        } else {
          successSnackbar('Service Imported');
          handleClose();
          reset();
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

  const handleClose = () => {
    setIsDrawerOpen(false);
    setModalStep(1);
    setImportLog('');
    methodsImportModalForm?.reset();
  };

  const resetImportModalForm = async () => {
    if (modalStep > 1) {
      setModalStep((prev) => --prev);
    } else handleClose();
  };

  const handleSelect = (selectedValue: any) => {
    setImportLog(selectedValue);
  };

  const handleFileChange = (event: any) => {
    if (event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.result) {
          const result: string = event?.target?.result?.toString();
          const lines = result?.split('\n');
          const headers = lines[0]?.split(',');
          const uniqueColumns = Array?.from(new Set(headers));
          const data = uniqueColumns?.map((column) => ({ column }));
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
    }
  };

  useEffect(() => {
    const importedFiles = csvFileData?.map((item: any) => ({
      fileColumn: item?.column,
      crmFields: null,
    }));
    methodsImportModalForm?.setValue('importedFields', importedFiles);
  }, [csvFileData]);

  useEffect(() => {
    {
      importDeals != null && handleFileChange(importDeals);
    }
    {
      product === null && (methodsImportModalForm?.reset(), setImportLog(''));
    }
    {
      importDeals != null &&
        modalStep === 1 &&
        methodsImportModalForm?.setValue('importDeals', null);
    }
  }, [importDeals, product, importLog, modalStep]);

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsImportModalForm,
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
    importDeals,
    fields,
    handlePreview,
    remove,
    lazyGetSignedUrlForImportStatus,
    uploadFileTos3UsingSignedUrlStatus,
    importFileStatus,
  };
};
