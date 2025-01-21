import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilterTickets } from './useFilterTickets';
import { FormGrid } from '@/components/Grids/FormGrid';

export const FilterTickets = () => {
  const {
    ticketsFilterFormFieldsData,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    onClose,
    resetTicketFilterForm,
    isPortalOpen,
  } = useFilterTickets();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={onClose}
        okText={'Apply'}
        title={'Filter'}
        submitHandler={handleSubmit(submitTicketFilterForm)}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={resetTicketFilterForm}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={ticketsFilterFormFieldsData} />
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
