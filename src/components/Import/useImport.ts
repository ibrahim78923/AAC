import {
  useImportFileMutation,
  useLazyGetSignedUrlForImportQuery,
  useUploadFileTos3UsingSignedUrlMutation,
} from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { processCSV } from '@/utils/file';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { importDefaultValues, importValidationSchema } from './Import.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useImport = (props: any) => {
  const { setDrawerDefaultState } = props;
  const [showItemsList, setShowItemsList] = useState(false);

  const importFormMethod = useForm<any>({
    defaultValues: importDefaultValues,
    resolver: yupResolver(importValidationSchema),
  });

  const { handleSubmit, reset, control } = importFormMethod;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'csvColumns',
  });

  const [
    uploadFileTos3UsingSignedUrlTrigger,
    uploadFileTos3UsingSignedUrlStatus,
  ] = useUploadFileTos3UsingSignedUrlMutation?.();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const [lazyGetSignedUrlForImportTrigger, lazyGetSignedUrlForImportStatus] =
    useLazyGetSignedUrlForImportQuery?.();

  const submitImportFile = async (data: any) => {
    if (!showItemsList) return await getSignedUrl?.(data);
    await uploadImportData?.(data);
  };

  const getSignedUrl = async (data: any) => {
    const signedUrlApiDataParameter = {
      queryParams: {
        objectUrl: 'users/attachment',
      },
    };
    try {
      const response: any = await lazyGetSignedUrlForImportTrigger?.(
        signedUrlApiDataParameter,
      )?.unwrap();
      const s3Data = {
        file: data?.file,
        signedUrl: response?.data,
      };
      await uploadToS3CsvFile?.(s3Data);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const uploadImportData = async (data: any) => {
    try {
      const response: any = await importFileTrigger?.(data)?.unwrap();
      successSnackbar(response?.data?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
      readFile?.(data?.file);
      successSnackbar('File Uploaded');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const text = e?.target?.result;
      const columns = processCSV(text);
      showColumnsList?.(columns);
    };
    reader.readAsText(file);
  };

  const showColumnsList = (columns: any) => {
    append(
      columns?.map((singleColumn: any) => ({
        csvColumn: singleColumn,
        crmColumn: null,
      })),
    );
    setShowItemsList(true);
  };

  const onClose = () => {
    setDrawerDefaultState?.();
    reset?.();
  };

  return {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    uploadFileTos3UsingSignedUrlStatus,
    lazyGetSignedUrlForImportStatus,
    fields,
    append,
    showItemsList,
    importFileStatus,
    remove,
  };
};
