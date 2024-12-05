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
import { downloadFile } from '@/utils/file';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { useLazyGetDealsListAsExportQuery } from '@/services/airSales/deals';

const ExportRecordModal = ({ open, onClose }: ExportRecordModalI) => {
  const [lazyGetExportDealsTrigger, { isLoading }] =
    useLazyGetDealsListAsExportQuery();

  const methods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (value: any) => {
    const queryParams = {
      exportType: value?.file,
    };
    try {
      const response = await lazyGetExportDealsTrigger(queryParams)?.unwrap();
      downloadFile(response, 'DealsLists', EXPORT_FILE_TYPE?.[value?.file]);
      onClose();
      reset();
      successSnackbar(`Deals Exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
      isLoading={isLoading}
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
