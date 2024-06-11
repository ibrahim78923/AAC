import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import { TYPE_VALUES } from './Contacts.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CircularProgress, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import ExistingContact from './ExistingContact';
import NewContact from './NewContact';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import useContacts from './useContacts';

export default function Contacts({ isDrawerOpen, setIsDrawerOpen }: any) {
  const {
    onClose,
    type,
    submitHandler,
    selected,
    postRemoveAssociateTicketsStatus,
    methods,
    setSelected,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    data,
    associateContactsColumns,
    modalId,
    onModalClose,
    removeTicketsAssociatesContacts,
    methodsNewContact,
    handleSubmit,
    onSubmit,
  } = useContacts({ setIsDrawerOpen });

  return (
    <>
      {isDrawerOpen?.contact && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.contact}
          onClose={onClose}
          title={
            type === TYPE_VALUES?.NEW_CONTACT
              ? 'Add Contacts'
              : 'Add Associate Contacts'
          }
          footer
          isOk
          okText={type === TYPE_VALUES?.NEW_CONTACT ? 'Submit' : 'Associate'}
          submitHandler={() => {
            type === TYPE_VALUES?.NEW_CONTACT
              ? handleSubmit(onSubmit)?.()
              : submitHandler?.();
          }}
          isDisabled={
            type === TYPE_VALUES?.NEW_CONTACT
              ? postRemoveAssociateTicketsStatus?.isLoading
              : !selected?.length || postRemoveAssociateTicketsStatus?.isLoading
          }
          isLoading={postRemoveAssociateTicketsStatus?.isLoading}
        >
          <FormProvider methods={methods}>
            <RHFRadioGroup
              name={'type'}
              options={[
                { value: TYPE_VALUES?.NEW_CONTACT, label: 'New Contact' },
                {
                  value: TYPE_VALUES?.EXISTING_CONTACT,
                  label: 'Existing Contact',
                },
              ]}
            />
          </FormProvider>

          {type === TYPE_VALUES?.NEW_CONTACT ? (
            <FormProvider methods={methodsNewContact}>
              <NewContact />
            </FormProvider>
          ) : (
            <ExistingContact setSelected={setSelected} selected={selected} />
          )}
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CONTACT_LIST_VIEW]}
      >
        <Typography variant={'h5'}>
          <Typography
            variant={'body1'}
            component={'span'}
            bgcolor={'secondary.main'}
            borderRadius={1}
            p={0.4}
            color={'common.white'}
            mr={0.5}
          >
            {isLoading || isFetching ? (
              <CircularProgress size={18} />
            ) : data?.length < 10 ? (
              `0${data?.length}`
            ) : (
              data?.length
            )}
          </Typography>
          Contacts
        </Typography>

        <TanstackTable
          columns={associateContactsColumns}
          data={data}
          isSuccess={isSuccess}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </PermissionsGuard>

      {modalId?.delete && (
        <AlertModals
          open={modalId?.delete}
          message="Are you sure you want to detach this contact?"
          handleClose={() => onModalClose?.()}
          handleSubmitBtn={() => removeTicketsAssociatesContacts?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={postRemoveAssociateTicketsStatus?.isLoading}
          disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}
    </>
  );
}
