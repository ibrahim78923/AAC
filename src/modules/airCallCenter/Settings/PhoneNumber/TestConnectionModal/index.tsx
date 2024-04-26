import { PauseIcon, PlayIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import useTestConnection from './useTestConnection';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

const TestConnectionModal = (props: any) => {
  const theme = useTheme();
  const { isTestConnectionModal, setIsTestConnectionModal } = props;
  const { isPlay, setIsPlay, isRecording, setIsRecording, methods } =
    useTestConnection();

  return (
    <CommonModal
      open={isTestConnectionModal}
      handleClose={() => setIsTestConnectionModal(false)}
      title="Audio Device Tests"
    >
      <Box display="flex" gap={2}>
        <Button
          sx={{
            color: theme?.palette?.common?.white,
            px: 1,
            backgroundColor: `${
              isRecording
                ? theme?.palette?.error?.main
                : theme?.palette?.primary?.main
            }`,
            '&:hover': {
              backgroundColor: `${
                isRecording
                  ? theme?.palette?.error?.main
                  : theme?.palette?.primary?.main
              }`,
            },
          }}
          className="small"
          startIcon={<RadioButtonCheckedIcon />}
          onClick={() => setIsRecording(!isRecording)}
        >
          Recording
        </Button>
        <Button
          variant="outlined"
          className="small"
          color="inherit"
          onClick={() => setIsPlay(!isPlay)}
          startIcon={isPlay ? <PauseIcon /> : <PlayIcon />}
        >
          Play
        </Button>
      </Box>
      <Box mt={2}>
        <FormProvider methods={methods}>
          <Typography
            variant="body1"
            fontWeight={600}
            color={theme?.palette?.grey[600]}
            mb={1}
          >
            Speaker
          </Typography>
          <RHFSelect
            name="outputDevices"
            label="Output Devices"
            select={true}
            size="small"
          >
            <option value="default">
              Default - Speakers (Realek High definition Audio)
            </option>
            <option value="default">
              Default - Speakers (Realek High definition Audio)
            </option>
          </RHFSelect>
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme?.palette?.grey[600]}
            >
              Output Level:{' '}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{ width: '152px' }}
            />
          </Box>
          <Typography
            variant="body1"
            fontWeight={600}
            color={theme?.palette?.grey[600]}
            mt={2}
            mb={1}
          >
            Microphone
          </Typography>
          <RHFSelect
            name="inputDevices"
            label="Input Devices"
            select={true}
            size="small"
          >
            <option value="default">
              Default - Speakers (Realek High definition Audio)
            </option>
            <option value="default">
              Default - Speakers (Realek High definition Audio)
            </option>
          </RHFSelect>
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              variant="body2"
              fontWeight={500}
              color={theme?.palette?.grey[600]}
            >
              Input Level:{' '}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{ width: '152px' }}
            />
          </Box>
        </FormProvider>
      </Box>
    </CommonModal>
  );
};

export default TestConnectionModal;
