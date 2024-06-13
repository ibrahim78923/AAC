import { AntSwitch } from '@/components/AntSwitch';
import { Box, Typography } from '@mui/material';
import { useNetworkWarningLogs } from './useNetworkWarningLogs';
import { ConfirmChange } from './ConfirmChange';

const NetworkWarningLogs = () => {
  const {
    isChecked,
    handleCheckboxChange,
    openConfirmModal,
    setOpenConfirmModal,
    setIsChecked,
  } = useNetworkWarningLogs();
  return (
    <>
      <Box border="0.1rem solid" borderColor="grey.700" borderRadius={2} p={2}>
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" color="slateBlue.main">
              Target
            </Typography>
            <Typography variant="body4" color="custom.main">
              Service level target
            </Typography>
          </Box>
          <Box>
            <AntSwitch
              checked={isChecked}
              isLoading={false}
              onChange={handleCheckboxChange}
            />
          </Box>
        </Box>
      </Box>
      <ConfirmChange
        setChecked={setIsChecked}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </>
  );
};

export default NetworkWarningLogs;
