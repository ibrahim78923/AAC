import CommonDrawer from '@/components/CommonDrawer';
import useCompanies from './useCompanies';
import { TYPE_VALUES } from './Companies.data';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import NewCompany from './NewCompany';
import ExistingCompany from './ExistingCompany';
import ViewCompany from './ViewCompany';
import { DataRecordCount } from '@/components/DataRecordCount';

export default function Companies({ isDrawerOpen, setIsDrawerOpen }: any) {
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
    associateCompanyColumns,
    modalId,
    setModalId,
    onModalClose,
    removeTicketsAssociatesCompany,
    methodsNewCompany,
    handleSubmit,
    onSubmit,
    postCompanyStatus,
  } = useCompanies({ setIsDrawerOpen });
  return (
    <>
      {isDrawerOpen?.company && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.company}
          onClose={onClose}
          title={
            type === TYPE_VALUES?.NEW_COMPANY
              ? 'Add Company'
              : 'Add Associate Companies'
          }
          footer
          isOk
          okText={type === TYPE_VALUES?.NEW_COMPANY ? 'Submit' : 'Associate'}
          submitHandler={() => {
            type === TYPE_VALUES?.NEW_COMPANY
              ? handleSubmit(onSubmit)?.()
              : submitHandler?.();
          }}
          isDisabled={
            type === TYPE_VALUES?.NEW_COMPANY
              ? postRemoveAssociateTicketsStatus?.isLoading ||
                postCompanyStatus?.isLoading
              : !selected?.length || postRemoveAssociateTicketsStatus?.isLoading
          }
          isLoading={
            postRemoveAssociateTicketsStatus?.isLoading ||
            postCompanyStatus?.isLoading
          }
          disabledCancelBtn={
            postRemoveAssociateTicketsStatus?.isLoading ||
            postCompanyStatus?.isLoading
          }
        >
          <FormProvider methods={methods}>
            <RHFRadioGroup
              name={'type'}
              options={[
                { value: TYPE_VALUES?.NEW_COMPANY, label: 'New Company' },
                {
                  value: TYPE_VALUES?.EXISTING_COMPANY,
                  label: 'Existing Company',
                },
              ]}
            />
          </FormProvider>

          {type === TYPE_VALUES?.NEW_COMPANY ? (
            <FormProvider methods={methodsNewCompany}>
              <NewCompany />
            </FormProvider>
          ) : (
            <ExistingCompany setSelected={setSelected} selected={selected} />
          )}
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.COMPANIES_LIST_VIEW,
        ]}
      >
        <DataRecordCount
          recordName="Companies"
          isCountLoading={isLoading || isFetching}
          totalCount={data?.length}
        />
        <TanstackTable
          columns={associateCompanyColumns}
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
          message="Are you sure you want to detach this company?"
          handleClose={() => onModalClose?.()}
          handleSubmitBtn={() => removeTicketsAssociatesCompany?.()}
          type={ALERT_MODALS_TYPE?.DELETE}
          cancelBtnText="Cancel"
          submitBtnText="Detach"
          loading={postRemoveAssociateTicketsStatus?.isLoading}
          disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
        />
      )}

      {modalId?.view && (
        <ViewCompany modalId={modalId} setModalId={setModalId} />
      )}
    </>
  );
}
