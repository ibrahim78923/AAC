import { Box, Typography } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import useViewEnquiry from './useViewEnquiry';
import { IChildModalState } from '../Enquiries.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { ARRAY_INDEX } from '@/constants/strings';

export const ViewEnquiry = ({ isModalOpen, onClose }: IChildModalState) => {
  const { methods, handleSubmit, onSubmit, status } = useViewEnquiry({
    isModalOpen,
    onClose,
  });

  return (
    <CustomCommonDialog
      isPortalOpen={isModalOpen?.viewOpen}
      closePortal={() => onClose?.()}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={status?.isLoading}
      disabledCancelButton={status?.isLoading}
      dialogTitle="Enquiry Comment"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h6'}>
          {isModalOpen?.data?.[ARRAY_INDEX?.ZERO]?.query}
        </Typography>

        <Box mt={2}>
          <RHFTextField
            name={'reply'}
            label={'Reply to Enquiry'}
            placeholder={'Reply to Enquiry'}
            required
            multiline
            rows={4}
          />
        </Box>
      </FormProvider>
    </CustomCommonDialog>
  );
};
export default ViewEnquiry;
