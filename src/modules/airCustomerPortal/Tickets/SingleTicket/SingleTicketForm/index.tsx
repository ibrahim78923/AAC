import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box } from '@mui/material';
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
          <item.component
            {...item?.componentProps}
            key={uuidv4()}
          ></item.component>
        ))}
      </FormProvider>
      <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
        <LoadingButton variant="contained" onClick={onSubmit}>
          Send
        </LoadingButton>
      </Box>
    </>
  );
};
