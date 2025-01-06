import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  MenuItem,
  Select,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { styles } from './AddRegNumber.style';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import {
  useGetTwilioConfigurationsQuery,
  useGetTwilioNumbersConfigurationsQuery,
} from '@/services/airMarketer/SmsMarketing/AddNewAccount';
import { v4 as uuidv4 } from 'uuid';
import { API_STATUS } from '@/constants';
import useConnectNumber from '../useConnectNumber';

const AddRegNumber: FC<any> = ({
  open,
  onClose,
  onPhoneChange,
  phoneValue,
  setPhoneNumber,
}) => {
  const {
    configValue,
    setConfigValue,
    handleAddRegNumSubmit,
    connectNumberLoading,
  } = useConnectNumber({});

  const { data, isLoading: isLoadingGetConfig } =
    useGetTwilioConfigurationsQuery({
      params: {
        page: 1,
        limit: 10,
        meta: true,
      },
    });
  const {
    data: dataTwilioNumbersConfig,
    status: isStatusDataTwilioNumbersConfig,
  } = useGetTwilioNumbersConfigurationsQuery(
    {
      params: {
        configurationId: configValue,
      },
    },
    { skip: configValue?.length < 1 },
  );

  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={styles?.dialog}
    >
      <DialogTitle>
        Add Registration Number
        <IconButton onClick={onClose}>
          <CloseModalIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '12px 24px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            mt: 1,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: '600', fontSize: '16px' }}
            >
              Integrate your Twilio Account
            </Typography>
            <Link href="./sms-marketing/connect-account">
              <Button
                variant="contained"
                color="primary"
                sx={{ height: '40px' }}
              >
                Connect
              </Button>
            </Link>
          </Box>
          {/* Change configuration  */}
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ height: '45px', borderRadius: '10px' }}
                value={configValue}
                onChange={(e: any) => {
                  setPhoneNumber('');
                  setConfigValue(e?.target?.value);
                }}
                displayEmpty
                disabled={isLoadingGetConfig}
                endAdornment={
                  <>
                    {isLoadingGetConfig && (
                      <Box sx={{ marginRight: '15px', marginTop: '5px' }}>
                        <CircularProgress size={25} />
                      </Box>
                    )}
                  </>
                }
              >
                <MenuItem value="" disabled>
                  <Box sx={{ color: theme?.palette?.grey[500] }}>
                    Select Configuration{' '}
                  </Box>
                </MenuItem>
                {data?.data?.twilioconfigurations &&
                  data?.data?.twilioconfigurations?.map((item: any) => (
                    <MenuItem value={item?._id} key={uuidv4()}>
                      {item?.name ?? '--'}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{ height: '40px' }}>
              Change
            </Button>
          </Box>
        </Box>
        {/* Connect Phone via config  */}
        <Box sx={styles?.regNumText}>
          Connect phone number to get started SMS broadcast
        </Box>
        <Box sx={{ mt: '20px' }}>
          <FormControl fullWidth>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ height: '45px', borderRadius: '10px' }}
              value={phoneValue}
              onChange={(e: any) => onPhoneChange(e?.target?.value)}
              displayEmpty
              disabled={
                configValue?.length < 1 ||
                isStatusDataTwilioNumbersConfig === API_STATUS?.PENDING
              }
              endAdornment={
                <>
                  {isStatusDataTwilioNumbersConfig === API_STATUS?.PENDING && (
                    <Box sx={{ marginRight: '15px', marginTop: '5px' }}>
                      <CircularProgress size={25} />
                    </Box>
                  )}
                </>
              }
            >
              <MenuItem value="" disabled>
                <Box sx={{ color: theme?.palette?.grey[500] }}>
                  Select Phone Number
                </Box>
              </MenuItem>
              {dataTwilioNumbersConfig?.data &&
                dataTwilioNumbersConfig?.data?.map((item: any) => (
                  <MenuItem value={item} key={uuidv4()}>
                    {formatPhoneNumber(item) ?? '--'}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="small"
          variant="outlined"
          onClick={onClose}
          sx={styles?.btnOutlined}
        >
          Cancel
        </Button>
        <LoadingButton
          className="small"
          variant="contained"
          onClick={() => handleAddRegNumSubmit(phoneValue, configValue)}
          loading={connectNumberLoading}
          disabled={phoneValue?.length < 1}
        >
          Continue
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

function formatPhoneNumber(phoneNumber: string): string {
  const phoneRegex = /^(\+1)(\d{3})(\d{3})(\d{4})$/;
  return phoneNumber?.replace(phoneRegex, '$1 ($2) $3-$4');
}

export default AddRegNumber;
