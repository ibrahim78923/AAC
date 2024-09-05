import { Grid, Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFMultiCheckbox } from '@/components/ReactHookForm';
import {
  sendDashboardViaEmailFormFieldsDynamic,
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  EMAIL_SEND_TYPE,
} from './Email.data';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import {
  useSendServiceDashboardViaEmailMutation,
  useSendServiceDashboardViaEmailOnceMutation,
} from '@/services/airServices/dashboard';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';

const EmailDashboard = ({ isOpenDrawer, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });
  const { handleSubmit, watch, control } = methods;

  const [
    sendServiceDashboardViaEmailTrigger,
    sendSalesDashboardViaEmailStatus,
  ] = useSendServiceDashboardViaEmailMutation();

  const [
    sendServiceDashboardViaEmailOnceTrigger,
    sendSalesDashboardViaEmailOnceStatus,
  ] = useSendServiceDashboardViaEmailOnceMutation();

  const isRecurringWatch = useWatch({
    control,
    name: 'isRecurring',
    defaultValue: '',
  });
  const sendDashboardViaEmailFormFields =
    sendDashboardViaEmailFormFieldsDynamic?.(isRecurringWatch);

  const sendEmailOnce = async (formData: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', formData?.email);
    emailFormData?.append('subject', formData?.emailSubject);
    !!formData?.message && emailFormData?.append('html', formData?.message);
    formData?.attachments !== null &&
      emailFormData?.append('attachments', formData?.attachments);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await sendServiceDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
      // closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const submitEmail = async (formData: any) => {
    const filteredFormData = filteredEmptyValues(formData);

    if (formData?.isRecurring === EMAIL_SEND_TYPE?.ONCE) {
      sendEmailOnce?.(filteredFormData);
      return;
    }

    const apiDataParameter = {
      queryParams: filteredFormData,
    };
    try {
      await sendServiceDashboardViaEmailTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
      // closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const watchFields = watch(['reportsInExport']);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Email this dashboard'}
      okText={'Send'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(submitEmail)}
      isDisabled={
        sendSalesDashboardViaEmailStatus?.isLoading ||
        sendSalesDashboardViaEmailOnceStatus?.isLoading
      }
      isLoading={
        sendSalesDashboardViaEmailStatus?.isLoading ||
        sendSalesDashboardViaEmailOnceStatus?.isLoading
      }
      disabledCancelBtn={
        sendSalesDashboardViaEmailStatus?.isLoading ||
        sendSalesDashboardViaEmailOnceStatus?.isLoading
      }
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {sendDashboardViaEmailFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {item?.componentProps?.name === 'reportsInExport' &&
                watchFields[0] === 'Include selected reports' ? (
                  <Grid item container>
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                    ></item.component>

                    <Grid item lg={12} sx={{ ml: 2 }}>
                      <RHFMultiCheckbox
                        name="selectedReports"
                        options={[
                          {
                            value: 'closedAndCreatedDeals',
                            label: 'Deals created vs Closed Deals',
                          },
                          { value: 'mettingDetails', label: 'Meeting Details' },
                          {
                            value: 'teamActivities',
                            label: 'Team activities by activity date',
                          },
                          {
                            value: 'totalDeals',
                            label:
                              'Total Deals, Open Deals, Team Goals, Cloded Won, Published Quotes',
                          },
                          { value: 'dealReports', label: 'Deal reports' },
                        ]}
                        GridView={12}
                      />
                    </Grid>
                    {/* {dataArraySelectedReports?.map((item: any) => (
                      <Grid item xs={12} key={uuidv4()}>
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                        >
                          {item?.componentProps?.select &&
                            item?.options?.map((option: any) => (
                              <option value={option?.value} key={uuidv4()}>
                                {option?.label}
                              </option>
                            ))}
                        </item.component>
                      </Grid>
                    ))} */}
                  </Grid>
                ) : (
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option value={option?.value} key={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
export default EmailDashboard;
