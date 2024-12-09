import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  exportButtonDefaultValue,
  exportButtonValidationSchema,
} from './ExportButton.data';
import { useState } from 'react';
import { errorSnackbar } from '@/utils/api';
import { useAppSelector } from '@/redux/store';
import { successSnackbar } from '@/lib/snackbar';
import { downloadLink } from '@/utils/download-blob';

export const useExportButton = ({ handleExportModalOpen }: any) => {
  const [datePickerSubmitVal, setDatePickerSubmitVal] = useState<any>();
  const methods = useForm<any>({
    resolver: yupResolver(exportButtonValidationSchema),
    defaultValues: exportButtonDefaultValue,
  });

  const { handleSubmit, watch, reset } = methods;

  const radioGroup = watch('radio');

  const socket = useAppSelector((state) => state?.chat?.socket);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const downloadFile = (payload: { url: string }) => {
    setIsLoadingDownload(false);
    handleExportModalOpen();

    if (payload && payload.url) {
      downloadLink(payload.url);
      successSnackbar('File Downloaded');
      handleExportModalOpen();
      reset();
    } else {
      errorSnackbar('Failed to retrieve download link.');
    }
  };

  const onSubmit = async (values: any) => {
    // const params = {
    //   page: 1,
    //   limit: 20,
    //   exportType: values?.fileFormat,
    //   ...(datePickerSubmitVal && {
    //     startDate: dayjs(datePickerSubmitVal[0] ?? datePickerSubmitVal)?.format(
    //       DATE_FORMAT?.API,
    //     ),
    //   }),
    //   ...(datePickerSubmitVal && {
    //     endDate: dayjs(datePickerSubmitVal[1] ?? datePickerSubmitVal)?.format(
    //       DATE_FORMAT?.API,
    //     ),
    //   }),
    // };

    let downloadHandled = false;
    const queryParams = {
      exportType: values?.fileFormat,
    };

    try {
      setIsLoadingDownload(true);
      socket.emit('exportEmailsMarketing', queryParams);
      socket.once('download-link', (payload: any) => {
        downloadHandled = true;
        downloadFile(payload);
      });
      socket.once('exception', (error: any) => {
        if (!downloadHandled) {
          setIsLoadingDownload(false);
          handleExportModalOpen();
          setDatePickerSubmitVal([]);
          reset();
          errorSnackbar(error?.message ?? 'error occurred');
        }
      });
    } catch (error: any) {
      setIsLoadingDownload(false);
      handleExportModalOpen();
      setDatePickerSubmitVal([]);
      errorSnackbar(
        error?.data?.message ?? 'An error occurred while downloading.',
      );
    }
  };

  return {
    handleSubmit,
    methods,
    onSubmit,
    radioGroup,
    datePickerSubmitVal,
    setDatePickerSubmitVal,
    isLoadingDownload,
  };
};
