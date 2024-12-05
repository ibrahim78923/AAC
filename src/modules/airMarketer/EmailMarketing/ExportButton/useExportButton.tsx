import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  exportButtonDefaultValue,
  exportButtonValidationSchema,
} from './ExportButton.data';
import { useLazyGetEmailMarketingListAsExportQuery } from '@/services/airMarketer/emailMarketing';
import { useState } from 'react';
import { errorSnackbar } from '@/utils/api';
import { DownloadCsv } from './download';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const useExportButton = ({ handleExportModalOpen }: any) => {
  const [datePickerSubmitVal, setDatePickerSubmitVal] = useState<any>();

  const [
    lazyGetEmailMarketingListAsExportTrigger,
    lazyGetEmailMarketingListAsExportStatus,
  ] = useLazyGetEmailMarketingListAsExportQuery();

  const methods = useForm<any>({
    resolver: yupResolver(exportButtonValidationSchema),
    defaultValues: exportButtonDefaultValue,
  });

  const { handleSubmit, watch } = methods;

  const radioGroup = watch('radio');

  const FILE_FORMATS: any = {
    CSV: 'CSV',
    XLS: 'XLSX',
  };

  const onSubmit = async (values: any) => {
    const params = {
      page: 1,
      limit: 20,
      exportType: values?.fileFormat,
      ...(datePickerSubmitVal && {
        startDate: dayjs(datePickerSubmitVal[0] ?? datePickerSubmitVal)?.format(
          DATE_FORMAT?.API,
        ),
      }),
      ...(datePickerSubmitVal && {
        endDate: dayjs(datePickerSubmitVal[1] ?? datePickerSubmitVal)?.format(
          DATE_FORMAT?.API,
        ),
      }),
    };
    try {
      await DownloadCsv(
        lazyGetEmailMarketingListAsExportTrigger,
        'email-marketing-reports',
        FILE_FORMATS[values?.fileFormat],
        params,
      );
      handleExportModalOpen();
      setDatePickerSubmitVal([]);
    } catch (error) {
      errorSnackbar('Error during export');
    }
  };

  return {
    handleSubmit,
    methods,
    onSubmit,
    radioGroup,
    lazyGetEmailMarketingListAsExportStatus,
    datePickerSubmitVal,
    setDatePickerSubmitVal,
  };
};
