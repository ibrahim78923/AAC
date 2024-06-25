import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import useTicketsEditorDrawer from './useTicketsEditorDrawer';
import {
  FORM_TYPE,
  existingTicketDataArray,
  ticketFormFieldsDynamic,
} from './TicketsEditorDrawer.data';
import { DRAWER_TITLE } from '@/constants';

const TicketsEditorDrawer = (props: any) => {
  const {
    drawerTitle,
    open,
    onClose,
    handleChangeFormType,
    formType,
    methodsNewTicket,
    methodsExistingTicket,
    disabledField,
    handleOnSubmit,
    isLoading,
  } = props;

  const {
    ticketsList,
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryAssociateAsset,
    apiQueryCategories,
  } = useTicketsEditorDrawer();

  const newFormFields = ticketFormFieldsDynamic(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryAssociateAsset,
    disabledField,
  );

  const existingFormFields = existingTicketDataArray(ticketsList);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={`${drawerTitle} Ticket`}
      okText={drawerTitle === DRAWER_TITLE?.ADD ? 'Add' : 'Update'}
      isOk={true}
      footer={drawerTitle === DRAWER_TITLE?.VIEW ? false : true}
      submitHandler={handleOnSubmit}
      isLoading={isLoading}
    >
      <Box>
        {drawerTitle === DRAWER_TITLE?.ADD && (
          <Grid container sx={{ mb: '8px' }}>
            <Grid item xs={12}>
              <RadioGroup
                name="formType"
                onChange={handleChangeFormType}
                value={formType}
                row
              >
                <FormControlLabel
                  value={FORM_TYPE?.NEW}
                  control={<Radio />}
                  label="New Ticket"
                />
                <FormControlLabel
                  value={FORM_TYPE?.EXISTING}
                  control={<Radio />}
                  label="Existing Ticket"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        )}
        {formType === FORM_TYPE?.EXISTING && (
          <FormProvider methods={methodsExistingTicket}>
            <Grid container spacing={'22px'}>
              {existingFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
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
              ))}
            </Grid>
          </FormProvider>
        )}
        {formType === FORM_TYPE?.NEW && (
          <FormProvider methods={methodsNewTicket}>
            <Grid container spacing={'22px'}>
              {newFormFields?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
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
              ))}
            </Grid>
          </FormProvider>
        )}
      </Box>
    </CommonDrawer>
  );
};

export default TicketsEditorDrawer;
