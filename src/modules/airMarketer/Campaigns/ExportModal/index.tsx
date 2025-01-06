import { useForm } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';

import { ExportRecordIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { RecordModalData, customDefaultValues } from './ExportModal.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isNullOrEmpty } from '@/utils';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { downloadLink } from '@/utils/download-blob';

const ExportModal = ({ open, onClose }: any) => {
  const handleClose = () => {
    onClose(false);
  };

  const methods: any = useForm({
    defaultValues: customDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const socket = useAppSelector((state) => state?.chat?.socket);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);

  const downloadFile = (payload: { url: string }) => {
    setIsLoadingDownload(false);
    handleClose();

    if (payload && payload.url) {
      downloadLink(payload.url);
      successSnackbar('Your download will start soon');
      handleClose();
      reset();
    } else {
      errorSnackbar('Failed to retrieve download link.');
    }
  };

  const onSubmit = async (value: any) => {
    if (!isNullOrEmpty(value?.file)) {
      let downloadHandled = false;
      const queryParams = {
        exportType: value?.file,
      };
      try {
        setIsLoadingDownload(true);
        socket.emit('exportCampaigns', queryParams);
        socket.once('download-link', (payload: any) => {
          downloadHandled = true;
          downloadFile(payload);
        });
        socket.once('exception', (error: any) => {
          if (!downloadHandled) {
            setIsLoadingDownload(false);
            handleClose();
            reset();
            errorSnackbar(error?.message ?? 'error occurred');
          }
        });
      } catch (error: any) {
        setIsLoadingDownload(false);
        handleClose();
        errorSnackbar(
          error?.data?.message ?? 'An error occurred while downloading.',
        );
      }
    } else {
      errorSnackbar(`Enter File Format`);
    }
  };

  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      handleCancel={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Export Record"
      okText={'Export'}
      cancelText={'Cancel'}
      footer={true}
      headerIcon={<ExportRecordIcon />}
      isLoading={isLoadingDownload}
    >
      <Typography fontWeight={500} sx={{ fontSize: '14px' }}>
        File Format
      </Typography>
      <FormProvider methods={methods}>
        {RecordModalData?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component
                {...item?.componentProps}
                size={'small'}
              ></item.component>
            </Grid>
          );
        })}
      </FormProvider>
    </CommonModal>
  );
};

export default ExportModal;
