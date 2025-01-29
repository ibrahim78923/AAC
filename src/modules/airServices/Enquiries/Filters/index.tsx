import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import useFilters from './useFilters';
import { IChildModalState } from '../Enquiries.interface';

export const Filters = ({
  isModalOpen,
  onClose,
  setFilter,
}: IChildModalState) => {
  const {
    handleSubmit,
    submitEnquiriesFilters,
    resetEnquiriesFilters,
    methods,
    statusOptions,
  } = useFilters({ setFilter, onClose });

  return (
    <CommonDrawer
      isDrawerOpen={isModalOpen}
      onClose={() => onClose?.()}
      okText={'Apply'}
      title={'Filter'}
      submitHandler={() => handleSubmit(submitEnquiriesFilters)()}
      isOk
      cancelText={'Reset'}
      footer
      cancelBtnHandler={() => resetEnquiriesFilters?.()}
    >
      <FormProvider methods={methods}>
        <RHFAutocomplete
          name={'status'}
          label={'Status'}
          size={'small'}
          placeholder={'Status'}
          options={statusOptions}
        />
      </FormProvider>
    </CommonDrawer>
  );
};
export default Filters;
