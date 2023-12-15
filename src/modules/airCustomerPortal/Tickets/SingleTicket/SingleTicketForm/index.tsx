import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AttachIcon } from '@/assets/icons';

export const SingleTicketForm = (props: any) => {
  const {
    singleTicketFormDataArray,
    singleTicketFormDefaultValues,
    singleTicketFormValidationSchema,
  } = props;
  const { methods, handleSubmit, onSubmit, fileImport, handleImport } =
    useSingleTicketForm({
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
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={2}
      >
        <Box display={'flex'} alignItems={'center'} gap={0.5}>
          <AttachIcon />
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ cursor: 'pointer' }}
            onClick={handleImport}
          >
            Attach a file
          </Typography>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            ref={fileImport}
          />
          <Typography variant="body2">(File size &lt; 40 MB)</Typography>
        </Box>
        <LoadingButton variant="contained" onClick={onSubmit}>
          Send
        </LoadingButton>
      </Box>
    </>
  );
};
