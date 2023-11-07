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

const ExportRecordModal = ({ open, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(customValidationSchema),
    defaultValues: customDefaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async () => {};

  return (
    <CommonModal
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Export Record"
      okText={'Export'}
      cancelText={'Cancel'}
      footer={true}
      headerIcon={<ExportRecordIcon />}
    >
      <FormProvider methods={methods}>
        {recordData?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
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
