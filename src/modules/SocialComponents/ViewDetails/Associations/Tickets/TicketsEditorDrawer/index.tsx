import { Box, Grid } from '@mui/material';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import useTicketsEditorDrawer from './useTicketsEditorDrawer';

import {
  ticketsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './TicketsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const TicketsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
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
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsTickets}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ paddingTop: '20px !important' }}>
                {watchTickets[0] === 'New Ticket' && (
                  <RHFRadioGroup
                    options={[
                      { value: 'New Ticket', label: 'New Ticket' },
                      { value: 'Existing Ticket', label: 'Existing Ticket' },
                    ]}
                    name={'ticketStatus'}
                    row={true}
                  />
                )}
              </Grid>
              {ticketsDataArray?.map((item: any, index: any) =>
                watchTickets[0] === 'New Ticket' ? (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={uuidv4()}
                    sx={{ paddingTop: '20px !important' }}
                  >
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
                ) : (
                  index === 0 && (
                    <Grid
                      item
                      xs={12}
                      md={item?.md}
                      key={uuidv4()}
                      sx={{ paddingTop: '0px !important' }}
                    >
                      <RHFRadioGroup
                        options={[
                          { value: 'New Ticket', label: 'New Ticket' },
                          {
                            value: 'Existing Ticket',
                            label: 'Existing Ticket',
                          },
                        ]}
                        name={'ticketStatus'}
                        row={true}
                      />
                      <Search
                        searchBy={searchTicket}
                        setSearchBy={setSearchTicket}
                        label="Search Products"
                        size="medium"
                        fullWidth
                      />
                    </Grid>
                  )
                ),
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default TicketsEditorDrawer;
