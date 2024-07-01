import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import useTicketsEditorDrawer from './useTicketsEditorDrawer';
import {
  ticketsDataArray,
  drawerTitle,
  ticketOptions,
  existingTicketDataArray,
} from './TicketsEditorDrawer.data';
import { DRAWER_TYPES } from '@/constants/strings';
import { TICKETS_TYPE } from '@/constants';

const TicketsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsNewTickets,
    watchTickets,
    apiQueryRequester,
    apiQueryCategories,
    ticketsList,
    loadingPostAssociation,
    loadingPostTicket,
  } = useTicketsEditorDrawer(setOpenDrawer);

  const addTicketFormParams = {
    apiQueryRequester,
    apiQueryCategories,
  };

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer?.isToggle}
      onClose={() => setOpenDrawer(false)}
      title={drawerTitle[openDrawer]}
      okText="Add"
      isOk={true}
      footer={openDrawer?.type !== DRAWER_TYPES?.ADD ? false : true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={loadingPostTicket || loadingPostAssociation}
    >
      <FormProvider methods={methodsNewTickets}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFRadioGroup
              options={ticketOptions}
              name={'ticketStatus'}
              label={false}
            />
          </Grid>

          {watchTickets === TICKETS_TYPE?.NEW_TICKETS ? (
            <Grid item container spacing={'22px'}>
              {ticketsDataArray(addTicketFormParams)?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid item container>
              {existingTicketDataArray(ticketsList)?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default TicketsEditorDrawer;
