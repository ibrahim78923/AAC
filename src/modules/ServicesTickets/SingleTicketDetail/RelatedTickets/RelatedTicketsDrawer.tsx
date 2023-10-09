import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketValidationSchema,
  createTicketDefaultValues,
  createTicketDataArray,
} from './CreateRelatedTicket/CreateRelatedTicket.data';

export const RelatedTicketsDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(createTicketValidationSchema), // validator
    defaultValues: createTicketDefaultValues, // initial form data , Note if not use form will be uncontrolled initially
  });

  const {
    handleSubmit, // submit form
    formState: {},
  } = methods;

  const submit = () => {
    // data.dob = dayjs(data.dob).format('YYYY-MM-DD');
    // data.timeFrom = dayjs(data.timeFrom).format('HH:MM:ss');
    // data.timeTo = dayjs(data.timeTo).format('HH:MM:ss');
  };
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add child ticket"
      submitHandler={() => {}}
      footer={true}
      isOk={true}
      okText="Add child ticket"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submit)}>
        <Grid container spacing={4}>
          {createTicketDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
