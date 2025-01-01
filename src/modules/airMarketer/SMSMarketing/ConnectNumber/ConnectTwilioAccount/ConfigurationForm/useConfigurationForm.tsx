import { useForm } from 'react-hook-form';
import {
  configurationFormDefaultValues,
  configurationFormValidationSchema,
} from './ConfigurationForm.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useAddTwilioConfigurationMutation } from '@/services/airMarketer/SmsMarketing/AddNewAccount';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useConfigurationForm = () => {
  const [addTwilioConfiguration, { isLoading: addTwilioConfigurationLoading }] =
    useAddTwilioConfigurationMutation();

  const router = useRouter();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(configurationFormValidationSchema),
    defaultValues: configurationFormDefaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async (values: any) => {
    const payload = {
      twilioAccountSid: values?.accountSid,
      twilioAuthToken: values?.authToken,
    };
    try {
      await addTwilioConfiguration({
        body: {
          twilioConfig: JSON.stringify(payload),
          name: values?.configName,
          medium: values?.serviceName,
        },
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      router.push(AIR_MARKETER?.SMS_MARKETING_INTEGRATION_CONFIG);
    } catch (error: any) {
      enqueueSnackbar('Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    router,
    theme,
    methods,
    handleSubmit,
    onSubmit,
    addTwilioConfigurationLoading,
  };
};

export default useConfigurationForm;
