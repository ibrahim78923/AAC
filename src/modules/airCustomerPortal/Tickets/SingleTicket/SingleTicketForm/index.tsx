import {
  FormProvider,
  RHFDropZone,
  RHFEditor,
} from '@/components/ReactHookForm';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styles } from './SingleTicketForm.style';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const SingleTicketForm = (props: any) => {
  const { singleTicketData } = props;
  const { methods, handleSubmit, onSubmit, theme } = useSingleTicketForm();

  return (
    <>
      {singleTicketData?.associateAssetsDetails?.map((item: any) => (
        <Box key={item?._id} sx={styles?.assetsCard(theme)}>
          <Typography variant="body1" fontWeight={600} sx={styles?.cardText}>
            {item?.displayName}
          </Typography>
          <Box sx={styles?.cardLine(theme)} />
          <Typography variant="body3" sx={styles?.cardText}>
            <b>Created Date:-</b>{' '}
            {dayjs(item?.createdAt)?.format(DATE_TIME_FORMAT?.DMYhmma)}
          </Typography>
        </Box>
      ))}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFEditor
          name="yourReplay"
          label="Your Replay"
          style={{ minHeight: 150 }}
        />
        <br />
        <RHFDropZone
          name="attachFile"
          fullWidth
          fileType={'PNG or JPG  (max 2.44 MB)'}
          maxSize={1024 * 1024 * 2.44}
          accept={{
            'image/*': ['.png', '.jpg'],
          }}
        />
        <br />
        <Box textAlign={'end'}>
          <LoadingButton variant="contained" type="submit">
            Send
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
