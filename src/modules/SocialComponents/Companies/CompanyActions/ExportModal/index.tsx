import { useForm } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';

import { ExportRecordIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { customDefaultValues, RecordModalData } from './ExportModal.data';
import { useLazyGetCompaniesListAsExportQuery } from '@/services/commonFeatures/companies';
import { isNullOrEmpty } from '@/utils';

const ExportModal = ({ setIsExport, isExport }: any) => {
  const [lazyGetExportCompaniesTrigger, { isLoading }] =
    useLazyGetCompaniesListAsExportQuery();

  const handleClose = () => {
    setIsExport(false);
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
          await lazyGetExportCompaniesTrigger(queryParams)?.unwrap();
        downloadFile(response, 'CompanyLists', EXPORT_FILE_TYPE?.[value?.file]);
        handleClose();
        reset();
        successSnackbar(`Companies Exported successfully`);
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    } else {
      errorSnackbar(`Enter File Format`);
    }
  };

  return (
    <CommonModal
      open={isExport}
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
