import { FormProvider, RHFEditor } from '@/components/ReactHookForm';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { AttachIcon } from '@/assets/icons';
import { styles } from './SingleTicketForm.style';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const SingleTicketForm = (props: any) => {
  const { singleTicketData } = props;
  const { methods, handleSubmit, onSubmit, fileImport, handleImport, theme } =
    useSingleTicketForm();
  return (
    <>
      {singleTicketData?.associateAssetsDetails?.map((item: any) => (
        <Box key={uuidv4()} sx={styles?.assetsCard(theme)}>
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
