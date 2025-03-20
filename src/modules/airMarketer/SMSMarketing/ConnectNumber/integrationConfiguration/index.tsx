import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Skeleton,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  ArrowBackIcon,
  IconArrowRounded,
  IconConnect,
  IconTwilio,
  PlusIcon,
} from '@/assets/icons';
import { styles } from './integrationConfiguration.style';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './integrationConfiguration.data';
import Link from 'next/link';
import { AIR_MARKETER } from '@/routesConstants/paths';
import {
  useDeleteTwilioConfigurationPhoneNumberMutation,
  useGetTwilioConfigurationsQuery,
  useUpdateSMSAccountConfigMutation,
} from '@/services/airMarketer/SmsMarketing/AddNewAccount';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { getActiveAccountSession, setActiveAccountSession } from '@/utils';
import { SmallLogoAvatar } from '@/components/Avatars/SmallLogoAvatar';

const IntegrationConfiguration = () => {
  const theme = useTheme();

  const activeAccount = getActiveAccountSession();

  const configId = activeAccount?.configurationId;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const {
    data,
    isLoading: isLoadingGetConfig,
    refetch,
  } = useGetTwilioConfigurationsQuery({
    params: {
      page: 1,
      limit: 10,
      meta: true,
      type: 'sms',
    },
  });

  const getRowValues = columns();

  const [activeRecord, setActiveRecord] = useState('');

  const [
    deleteTwilioConfigurationPhoneNumber,
    { isLoading: deleteTwilioConfigurationPhoneNumberLoading },
  ] = useDeleteTwilioConfigurationPhoneNumberMutation();

  const handleDeleteRecipient = async () => {
    try {
      await deleteTwilioConfigurationPhoneNumber({
        smsPhoneNumberId: activeId,
      })?.unwrap();
      enqueueSnackbar(`Record deleted Successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setActiveId('');
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const [updateAccountConfig, { isLoading: connectUpdateAccountConfig }] =
    useUpdateSMSAccountConfigMutation();

  const handleUpdateConfig = async (id: any) => {
    const payload = {
      configurationId: id,
      updateConfiguration: true,
    };
    try {
      await updateAccountConfig({
        body: payload,
        id: activeAccount?._id,
      })?.unwrap();
      handelUpdatedAccountSession(id);
      enqueueSnackbar('Configuration Changed Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleUpdateDisConnectConfig = async (id: any) => {
    const payload = {
      configurationId: id,
      updateConfiguration: true,
    };
    try {
      await updateAccountConfig({
        body: payload,
        id: activeAccount?._id,
      })?.unwrap();
      const updatedAccount = { ...activeAccount };
      delete updatedAccount?.configurationId;
      delete updatedAccount?.twilioNumber;
      setActiveAccountSession(updatedAccount);
      enqueueSnackbar('Configuration Changed Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handelUpdatedAccountSession = (id: any) => {
    // eslint-disable-next-line
    const { twilioNumber, ...accountWithoutTwilio } = activeAccount;
    setActiveAccountSession({
      ...accountWithoutTwilio,
      configurationId: id,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Integration Configuration
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <IconTwilio size={48} />
          <Box>
            <Typography variant="h5">Twilio</Typography>
            <Typography variant="body2">Integrations and settings</Typography>
          </Box>
        </Box>
        <Link href={AIR_MARKETER?.SMS_MARKETING_CONNECT_ACCOUNT}>
          <Button variant="contained" color="primary" startIcon={<PlusIcon />}>
            {' '}
            Add New
          </Button>
        </Link>
      </Box>
      {isLoadingGetConfig ? (
        <>
          <Skeleton variant="rounded" height={88} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" height={88} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" height={88} sx={{ mb: 1 }} />
        </>
      ) : (
        <>
          {data?.data?.twilioconfigurations?.map((item: any) => {
            return (
              <Box sx={{ mt: 3 }} key={item?._id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<IconArrowRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={styles?.accordionSummary(theme)}
                  >
                    <Box sx={styles?.accordionSummaryInner()}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                          }}
                        >
                          <Box sx={styles?.glowIcons(theme)}>
                            <IconTwilio />
                          </Box>
                          <Typography variant="body2">{item?.name}</Typography>
                        </Box>
                        <Box sx={{ marginTop: '8px' }}>
                          <IconConnect />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                          }}
                        >
                          <Box
                            sx={{ ...styles?.glowIcons(theme), width: 'auto' }}
                          >
                            <SmallLogoAvatar />
                          </Box>
                          <Typography variant="body2">
                            {item?.userDetails?.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={
                            activeRecord === item?._id &&
                            connectUpdateAccountConfig ? (
                              <CircularProgress size={20} sx={{ mr: 1 }} />
                            ) : (
                              <>
                                <Switch
                                  checked={configId === item?._id}
                                  size="small"
                                  onClick={() => {
                                    setActiveRecord(item?._id);
                                    if (configId === item?._id) {
                                      handleUpdateDisConnectConfig(item?._id);
                                    } else {
                                      handleUpdateConfig(item?._id);
                                    }
                                  }}
                                />
                              </>
                            )
                          }
                          label="Disconnect"
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TanstackTable
                      columns={getRowValues}
                      data={item?.smsPhoneNumbers ?? []}
                      isPagination={false}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </>
      )}

      <AlertModals
        message={'Are you sure you want to delete this Record?'}
        type={'delete'}
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmitBtn={handleDeleteRecipient}
        loading={deleteTwilioConfigurationPhoneNumberLoading}
      />
    </Box>
  );
};

export default IntegrationConfiguration;
