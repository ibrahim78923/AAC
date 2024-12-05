import { useForm } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';

import { ExportRecordIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { RecordModalData, customDefaultValues } from './ExportModal.data';
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { useLazyGetCampaignsListAsExportQuery } from '@/services/airMarketer/campaigns';
import { isNullOrEmpty } from '@/utils';

const ExportModal = ({ open, onClose }: any) => {
  const [lazyGetExportCampaignsTrigger, { isLoading }] =
    useLazyGetCampaignsListAsExportQuery();

  const handleClose = () => {
    onClose(false);
  };

  const methods: any = useForm({
    defaultValues: customDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (value: any) => {
    if (!isNullOrEmpty(value?.file)) {
      const queryParams = {
        exportType: value?.file,
      };
      try {
        const response =
          await lazyGetExportCampaignsTrigger(queryParams)?.unwrap();
        downloadFile(
          response,
          'CampaignsLists',
          EXPORT_FILE_TYPE?.[value?.file],
        );
        handleClose();
        reset();
        successSnackbar(`Campaigns Exported successfully`);
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
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
      isLoading={isLoading}
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
