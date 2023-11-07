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
} from './CreateRelatedTickets.data';
import { useRelatedTickets } from '../useRelatedTickets';

export const CreateRelatedTicketsDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: any) => {
  const { enqueueSnackbar } = useRelatedTickets();
  const methods: any = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const {
    handleSubmit,
    formState: {},
  } = methods;

  const submit = () => {
    enqueueSnackbar('child ticket added successfully', {
      variant: 'success',
    });
  };
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add child ticket"
      submitHandler={methods.handleSubmit(submit)}
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
