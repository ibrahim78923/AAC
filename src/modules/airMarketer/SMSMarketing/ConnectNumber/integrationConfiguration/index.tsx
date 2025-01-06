import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Skeleton,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  IconAirFP,
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
} from '@/services/airMarketer/SmsMarketing/AddNewAccount';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const IntegrationConfiguration = () => {
  const theme = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const { data, isLoading: isLoadingGetConfig } =
    useGetTwilioConfigurationsQuery({
      params: {
        page: 1,
        limit: 10,
        meta: true,
      },
    });

  const getRowValues = columns(theme, setIsDeleteModalOpen, setActiveId);

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
          {data?.data?.twilioconfigurations?.map((item: any) => (
            <Box sx={{ mt: 3 }} key={item?._id}>
              <Accordion defaultExpanded>
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
                        <Box sx={styles?.glowIcons(theme)}>
                          <IconAirFP />
                        </Box>
                        <Typography variant="body2">
                          {item?.userDetails?.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <FormControlLabel
                        control={<Switch defaultChecked size="small" />}
                        label="Disconnect"
                      />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TanstackTable
                    columns={getRowValues}
                    data={item?.phoneNumbers}
                    isPagination={false}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
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
