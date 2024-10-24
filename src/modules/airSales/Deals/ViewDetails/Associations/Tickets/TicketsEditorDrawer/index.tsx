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
import {
  DRAWER_ACTIONS_TITLES,
  ROLES_ACTION_CONSTANTS,
} from '@/constants/strings';
import { TICKETS_TYPE } from '@/constants';
import { TicketsEditorDrawerProps } from '../../Associations-interface';

const TicketsEditorDrawer = (props: TicketsEditorDrawerProps) => {
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
  } = useTicketsEditorDrawer(setOpenDrawer, openDrawer?.data);

  const addTicketFormParams = {
    apiQueryRequester,
    apiQueryCategories,
  };

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer?.isToggle}
      onClose={() => setOpenDrawer({ ...openDrawer, isToggle: false })}
      title={drawerTitle[openDrawer?.type]}
      okText="Add"
      isOk={true}
      footer={openDrawer?.type !== ROLES_ACTION_CONSTANTS?.ADD ? false : true}
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
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    disabled={
                      openDrawer?.type === DRAWER_ACTIONS_TITLES?.VIEW
                        ? true
                        : false
                    }
                  />
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
