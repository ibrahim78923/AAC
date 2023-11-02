import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const SingleTicketForm = (props: any) => {
  const {
    singleTicketFormDataArray,
    singleTicketFormDefaultValues,
    singleTicketFormValidationSchema,
  } = props;
  const { methods, handleSubmit, onSubmit } = useSingleTicketForm({
    singleTicketFormDefaultValues,
    singleTicketFormValidationSchema,
  });
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {singleTicketFormDataArray?.map((item: any) => (
          <item.component {...item?.componentProps} key={uuidv4()}>
            {item?.componentProps?.select &&
              item?.options?.map((option: any) => (
                <option key={uuidv4()} value={option?.value}>
                  {option?.label}
                </option>
              ))}
          </item.component>
        ))}
      </FormProvider>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mt={2}
        gap={'1rem'}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <LoadingButton>Attach file</LoadingButton>
          <Typography variant="body2">(File Size is less then 40MB)</Typography>
        </Box>
        <LoadingButton variant="contained" onClick={onSubmit}>
          Send
        </LoadingButton>
      </Box>
    </>
  );
};
