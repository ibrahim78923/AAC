import { Box, Grid } from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import useTicketsEditorDrawer from './useTicketsEditorDrawer';

import { ticketsDataArray } from './TicketsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import { DRAWER_TITLE } from '@/constants';

const TicketsEditorDrawer = (props: any) => {
  const { open, onClose, drawerTitle } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsTickets,
    watchTickets,
    searchTicket,
    setSearchTicket,
  } = useTicketsEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        title={drawerTitle}
        okText={drawerTitle === DRAWER_TITLE?.ADD ? 'Add' : 'Update'}
        isOk={true}
        footer={drawerTitle === DRAWER_TITLE?.VIEW ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsTickets}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={['New Ticket', 'Existing Ticket']}
                  name={'ticketStatus'}
                  label={false}
                />
              </Grid>
              {watchTickets[0] === 'New Ticket' ? (
                ticketsDataArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select
                        ? item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : null}
                    </item.component>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Search
                    searchBy={searchTicket}
                    setSearchBy={setSearchTicket}
                    label="Search Products"
                    size="medium"
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default TicketsEditorDrawer;
