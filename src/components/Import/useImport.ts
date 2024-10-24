import {
  useLazyGetSignedUrlForImportQuery,
  useUploadFileTos3UsingSignedUrlMutation,
} from '@/services/airServices/global/import';
import { processCSV } from '@/utils/file';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { importDefaultValues, importValidationSchema } from './Import.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useImport = (props: any) => {
  const {
    setDrawerDefaultState,
    objectUrl,
    submitImport,
    mandatoryColumnsList = [],
    hasNewImportApi = true,
    importFileStatus,
  } = props;

  const [showItemsList, setShowItemsList] = useState(false);

  const importFormMethod = useForm<any>({
    defaultValues: importDefaultValues,
    resolver: yupResolver(importValidationSchema),
  });

  const { handleSubmit, reset, control, setValue } = importFormMethod;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'csvColumns',
  });

  const [
    uploadFileTos3UsingSignedUrlTrigger,
    uploadFileTos3UsingSignedUrlStatus,
  ] = useUploadFileTos3UsingSignedUrlMutation?.();

  const [lazyGetSignedUrlForImportTrigger, lazyGetSignedUrlForImportStatus] =
    useLazyGetSignedUrlForImportQuery?.();

  const submitImportFile = async (data: any) => {
    if (!showItemsList) return await getSignedUrl?.(data);
    await uploadImportData?.(data);
  };
  const cancelBtnHandler = () => {
    if (!showItemsList) return onClose?.();
    setValue('csvColumns', []);
    setShowItemsList(false);
  };

  const getSignedUrl = async (data: any) => {
    const signedUrlApiDataParameter = {
      queryParams: {
        objectUrl: `${objectUrl}/${data?.file?.name}`,
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
      const url = new URL(`${response?.data}`);
      const filePath = `${url?.origin}${url?.pathname}`;
      setValue?.('fileUrl', filePath);
      await uploadToS3CsvFile?.(s3Data);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const uploadImportData = async (data: any) => {
    const dataColumn = hasNewImportApi
      ? data?.csvColumns?.reduce(
          (acc: any, item: any) => ({
            ...acc,
            [item?.csvColumn]: item?.crmColumn?._id,
          }),
          {},
        )
      : data?.csvColumns?.reduce(
          (acc: any, item: any) => ({
            ...acc,
            [item?.crmColumn?._id]: item?.csvColumn,
          }),
          {},
        );

    const allCrmColumnsKeys = hasNewImportApi
      ? Object?.values(dataColumn ?? {})
      : Object?.keys(dataColumn ?? {});

    const hasDuplicateCrmColumns =
      new Set(allCrmColumnsKeys)?.size !== allCrmColumnsKeys?.length;

    if (hasDuplicateCrmColumns) {
      errorSnackbar('Crm fields must be unique');
      return;
    }

    const isRequiredFieldMap: any = allCrmColumnsKeys?.reduce(
      (acc: any, curr: any) => ((acc[curr] = true), acc),
      {},
    );

    const isAllRequiredFieldPresent = mandatoryColumnsList?.every(
      (crmColumn: any) => isRequiredFieldMap?.[crmColumn?._id],
    );

    if (!isAllRequiredFieldPresent) {
      errorSnackbar('Select all mandatory field(s)');
      return;
    }

    const apiData = {
      dataColumn,
      ...data,
      setShowItemsList,
      onClose,
    };

    await submitImport?.(apiData);
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
      successSnackbar('File uploaded successfully');
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

  const apiCallInProgress =
    importFileStatus?.isLoading ||
    uploadFileTos3UsingSignedUrlStatus?.isLoading ||
    lazyGetSignedUrlForImportStatus?.isLoading;

  return {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    showItemsList,
    fields,
    remove,
    uploadFileTos3UsingSignedUrlStatus,
    lazyGetSignedUrlForImportStatus,
    cancelBtnHandler,
    apiCallInProgress,
  };
};
