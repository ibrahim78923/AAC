import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  recordData,
  customDefaultValues,
  customValidationSchema,
} from './ExportRecord.data';
import { ExportRecordIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { ExportRecordModalI } from '../DealsModalBox-interface';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useAppSelector } from '@/redux/store';
import { downloadLink } from '@/utils/download-blob';

const ExportRecordModal = ({ open, onClose }: ExportRecordModalI) => {
  const methods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });
  const socket = useAppSelector((state) => state?.chat?.socket);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const downloadFile = (payload: { url: string }) => {
    setIsLoadingDownload(false);
    onClose();

    if (payload && payload.url) {
      downloadLink(payload.url);
      successSnackbar('File Downloaded');
      onClose();
      reset();
    } else {
      errorSnackbar('Failed to retrieve download link.');
    }
  };

  const { handleSubmit, reset } = methods;
  const onSubmit = async (value: any) => {
    let downloadHandled = false;
    const queryParams = {
      exportType: value?.file,
    };

    try {
      setIsLoadingDownload(true);
      socket.emit('exportDeals', queryParams);
      socket.once('download-link', (payload: any) => {
        downloadHandled = true;
        downloadFile(payload);
      });
      socket.once('exception', (error: any) => {
        if (!downloadHandled) {
          setIsLoadingDownload(false);
          onClose();
          reset();
          errorSnackbar(error?.message ?? 'error occurred');
        }
      });
    } catch (error: any) {
      setIsLoadingDownload(false);
      onClose();
      errorSnackbar(
        error?.data?.message ?? 'An error occurred while downloading.',
      );
    }
  };

  return (
    <CommonModal
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Export Record"
      okText={'Export'}
      cancelText={'Cancel'}
      footer
      headerIcon={<ExportRecordIcon />}
      handleCancel={onClose}
      isLoading={isLoadingDownload}
    >
      <FormProvider methods={methods}>
        {recordData?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          );
        })}
      </FormProvider>
    </CommonModal>
  );
};

export default ExportRecordModal;
