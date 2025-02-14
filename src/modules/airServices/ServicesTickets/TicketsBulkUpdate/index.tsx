import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useTicketBulkUpdate } from './useTicketsBulkUpdate';
import { Close } from '@mui/icons-material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormGrid } from '@/components/Grids/FormGrid';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

const TicketsBulkUpdate = () => {
  const {
    ticketsBulkUpdateFormFields,
    theme,
    ticketsBulkUpdateAddReplyFormFieldsData,
    methods,
    handleSubmit,
    isReplyAdded,
    setIsReplyAdded,
    onClose,
    submitTicketBulkUpdateForm,
    isPortalOpen,
    apiCallInProgress,
  }: any = useTicketBulkUpdate();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={onClose}
        okText={'Update'}
        title={'Bulk Update'}
        submitHandler={handleSubmit(submitTicketBulkUpdateForm)}
        isOk
        footer
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        {!isReplyAdded && (
          <AddNewItemButton
            name="Add Reply"
            variant="text"
            color="primary"
            customStyles={{ backgroundColor: 'primary.lighter' }}
            onClick={() => setIsReplyAdded(true)}
          />
        )}
        <br />
        <FormProvider methods={methods}>
          {isReplyAdded && (
            <Box
              padding={1.25}
              borderRadius={2}
              sx={{ backgroundColor: theme?.palette?.primary?.lighter }}
            >
              <Box textAlign={'right'}>
                <Close
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setIsReplyAdded(false)}
                />
              </Box>
              <FormGrid
                spacing={1}
                formFieldsList={ticketsBulkUpdateAddReplyFormFieldsData}
              />
            </Box>
          )}
          <br />
          <FormGrid spacing={1} formFieldsList={ticketsBulkUpdateFormFields} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default TicketsBulkUpdate;
