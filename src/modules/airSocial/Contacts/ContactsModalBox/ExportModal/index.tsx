import { useForm } from 'react-hook-form';

import { Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';

import { ExportRecordIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { RecordModalData, customDefaultValues } from './ExportModal.data';

const ExportModal = ({ open, onClose }: any) => {
  const methods: any = useForm({
    defaultValues: customDefaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async () => {};

  return (
    <CommonModal
      open={open}
      handleClose={() => onClose(false)}
      handleCancel={() => onClose(false)}
      handleSubmit={handleSubmit(onSubmit)}
      title="Export Record"
      okText={'Export'}
      cancelText={'Cancel'}
      footer={true}
      headerIcon={<ExportRecordIcon />}
    >
      <Typography fontWeight={500} sx={{ fontSize: '14px' }}>
        File Format
      </Typography>
      <FormProvider methods={methods}>
        {RecordModalData?.map((item: any) => {
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

export default ExportModal;
