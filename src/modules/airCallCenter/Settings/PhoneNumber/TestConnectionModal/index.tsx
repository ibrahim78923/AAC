import { PauseIcon, PlayIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { Box, Button, useTheme } from '@mui/material';
import useTestConnection from './useTestConnection';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const TestConnectionModal = (props: any) => {
  const theme = useTheme();
  const { isTestConnectionModal, setIsTestConnectionModal } = props;
  const { isPlay, setIsPlay, isRecording, setIsRecording } =
    useTestConnection();

  return (
    <CommonModal
      open={isTestConnectionModal}
      handleClose={() => setIsTestConnectionModal(false)}
      title="Audio Device Tests"
    >
      <Box display="flex" gap={2}>
        <Button
          // variant={isRecording ? 'contained' : 'danger'}
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
    </CommonModal>
  );
};

export default TestConnectionModal;
