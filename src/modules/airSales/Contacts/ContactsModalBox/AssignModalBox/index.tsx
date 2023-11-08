import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';

import { RestoreDealsIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import {
  AssignModalData,
  customDefaultValues,
  customValidationSchema,
} from './AssignModal.data';

const AssignModalBox = ({ open, onClose }: any) => {
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
      title="Assign"
      okText={'Update'}
      cancelText={'Cancel'}
      footer={true}
      headerIcon={<RestoreDealsIcon />}
    >
      <FormProvider methods={methods}>
        {AssignModalData?.map((item: any) => {
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

export default AssignModalBox;
