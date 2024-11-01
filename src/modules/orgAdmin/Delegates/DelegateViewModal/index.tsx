import { UserFeatureIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';

const DelegateViewModal = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;
  const theme = useTheme();
  return (
    <CommonModal
      open={isModalOpen?.viewDetail}
      handleClose={() => setIsModalOpen({ ...isModalOpen, viewDetail: false })}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
      headerIcon={<UserFeatureIcon />}
      okText=""
      title={'Track the application of Air Applecart in real-time'}
      footer={false}
    >
      <Box sx={{ borderRadius: '16px', background: '#EEF9F1' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography
              sx={{
                background: `${theme?.palette?.success?.main}`,
                padding: '4px 12px',
                borderRadius: '8px',
                color: `${theme?.palette?.common?.white}`,
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              1
            </Typography>
            <Typography
              sx={{
                color: `${theme?.palette?.slateBlue?.main}`,
                fontSize: '18px',
                fontWeight: 400,
              }}
            >
              Sign Up
            </Typography>
          </Box>
          <CheckCircle sx={{ color: `${theme?.palette?.success?.main}` }} />
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: '16px',
          background: '#EEF9F1',
          marginTop: '1REM',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography
              sx={{
                background: `${theme?.palette?.success?.main}`,
                padding: '4px 12px',
                borderRadius: '8px',
                color: `${theme?.palette?.common?.white}`,
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              2
            </Typography>
            <Typography
              sx={{
                color: `${theme?.palette?.slateBlue?.main}`,
                fontSize: '18px',
                fontWeight: 400,
              }}
            >
              Buy Product Plan
            </Typography>
          </Box>
          <CheckCircle sx={{ color: `${theme?.palette?.success?.main}` }} />
        </Box>
      </Box>
    </CommonModal>
  );
};

export default DelegateViewModal;
